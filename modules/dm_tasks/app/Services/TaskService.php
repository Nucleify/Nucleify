<?php

namespace App\Services;

use App\Models\Task;
use App\Resources\TaskResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Task $model,
        protected string $entity = 'task',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * @throws Exception
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->model->all();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return TaskResource::collection($result);
    }

    /**
     * @throws Exception
     */
    public function countByCreatedLastWeek(Request $request): int
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererStructural);

        return $result;
    }

    /**
     * @throws Exception
     */
    public function show($id): TaskResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'showed');

        return new TaskResource($result);
    }

    /**
     * @throws Exception
     */
    public function create(array $data): TaskResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'created');

        return new TaskResource($result);
    }

    /**
     * @throws Exception
     */
    public function update($id, array $data): TaskResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'updated');

        return new TaskResource($result->fresh());
    }

    /**
     * @throws Exception
     */
    public function delete($id): void
    {
        $this->defineUserData();

        $model = $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($this->causer->name, $model->getTitle(), $this->entity, 'deleted');
    }
}
