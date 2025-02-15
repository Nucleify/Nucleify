<?php

namespace App\Services\Entities;

use App\Models\Question;
use App\Services\Utilities\Activity\LoggerService;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\QuestionTransformer;
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

        $questions = $this->isCauserStaff ? ($this->isRefererAdmin
            ? $this->model->all()
            : $this->model->where('user_id', $this->causer->id)->get()
        )
            : $this->model->where('user_id', $this->causer->id)->get();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererAdmin);

        return fractal()
            ->collection($questions)
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

        $count = $this->isCauserStaff ? ($this->isRefererAdmin
            ? $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->count()
            : $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->where('user_id', $this->causer->id)
                ->count()
        )
            : $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->where('user_id', $this->causer->id)
                ->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererAdmin);

        return ['count' => $count];
    }

    /**
     * @param $id
     *
     * @return array
     */
    public function show($id): array
    {
        $this->defineUserData();

        $model = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $this->logger->log($this->causer->name, $model->getContent(), $this->entity, 'showed');

        return fractal()
            ->item($model)
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

        $model = $this->model::create($data);

        $this->logger->log($this->causer->name, $model->getContent(), $this->entity, 'created');

        return fractal()
            ->item($model)
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

        $model = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $model->update($data);

        $this->logger->log($this->causer->name, $model->getContent(), $this->entity, 'updated');

        return fractal()
            ->item($model->fresh())
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