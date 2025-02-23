<?php

namespace App\Services\Structural;

use App\Models\Structural\Question;
use App\Services\Utilities\Activity\LoggerService;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\Structural\QuestionTransformer;
use Illuminate\Http\Request;

class QuestionService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    /**
     * @param Question $model
     * @param string $entity
     * @param LoggerService $logger
     */
    public function __construct(
        private readonly Question $model,
        protected string $entity = 'question',
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

        $result = $this->isCauserStaff && $this->isRefererStructural
            ? $this->model->all()
            : $this->model->where('user_id', $this->causer->id)->get();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return fractal()
            ->collection($result)
            ->transformWith(new QuestionTransformer())
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

        $result = $this->isCauserStaff && $this->isRefererStructural
            ? $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->count()
            : $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->where('user_id', $this->causer->id)
                ->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererStructural);

        return ['count' => $result];
    }

    /**
     * @param string $category
     *
     * @return array
     */
    public function getByCategory(string $category): array
    {
        $this->defineUserData();

        $result = $this->causer->isUser()
            ? $this->model->where('user_id', $this->causer->id)::getByCategory($category)->get()
            : $this->model::getByCategory($category)->get();

        $this->logger->logMessage($this->causer->name . ' filtered questions by category: ' . $category . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new QuestionTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $site
     *
     * @return array
     */
    public function getSiteQuestions(string $site): array
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name  . ' filtered questions by site: ' . $site . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new QuestionTransformer())
            ->toArray()['data'];
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

        $this->logger->log($this->causer->name, $result->getContent(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new QuestionTransformer())
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

        $this->logger->log($this->causer->name, $result->getContent(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new QuestionTransformer())
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

        $this->logger->log($this->causer->name, $result->getContent(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new QuestionTransformer())
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

        $model = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $model->delete();

        $this->logger->log($this->causer->name, $model->getContent(), $this->entity, 'deleted');
    }
}
