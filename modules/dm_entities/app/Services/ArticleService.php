<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Models\Article;
use App\Services\Utilities\Activity\LoggerService;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\ArticleTransformer;

class ArticleService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    /**
     * @param Article $model
     * @param string $entity
     * @param LoggerService $logger
     */
    public function __construct(
        private readonly Article $model,
        protected string $entity = 'article',
        private readonly LoggerService $logger = new LoggerService()
    ) {}

    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function index(Request $request): mixed
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->isCauserStaff && $this->isRefererAdmin
            ? $this->model->all()
            : $this->model->where('user_id', $this->causer->id)->get();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererAdmin);

        return fractal()
            ->collection($result)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function countByCreatedLastWeek(Request $request): array
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $result = $this->isCauserStaff && $this->isRefererAdmin
            ? $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->count()
            : $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->where('user_id', $this->causer->id)
                ->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererAdmin);

        return ['count' => $result];
    }

    /**
     * @param $id
     *
     * @return array
     */
    public function show($id): array
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public function create(array $data): array
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     * @param array $data
     *
     * @return array
     */
    public function update($id, array $data): array
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'updated');

        return fractal()->item($result->fresh())
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     *
     * @return void
     */
    public function delete($id): void
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $result->delete();

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'deleted');
    }
}
