<?php

namespace App\Services;

use App\Models\SystemColor;
use App\Resources\SystemColorResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SystemColorService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly SystemColor $model,
        protected string $entity = 'system color',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * @param Request $request
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->model->all();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logIndex($name, $this->entity, true);

        return SystemColorResource::collection($result);
    }

    /**
     * @param Request $request
     *
     * @return int
     *
     * @throws Exception
     */
    public function countByCreatedLastWeek(Request $request): int
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)->count();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logCountByCreatedLastWeek($name, $this->entity, $this->isRefererStructural);

        return $result;
    }

    /**
     * @param string $name
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getByName(string $name): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByName($name)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched system colors by name: ' . $name . '.');

        return SystemColorResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return SystemColorResource
     *
     * @throws Exception
     */
    public function show($id): SystemColorResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->log($name, $result->getValue(), $this->entity, 'showed');

        return new SystemColorResource($result);
    }

    /**
     * @param array $data
     *
     * @return SystemColorResource
     *
     * @throws Exception
     */
    public function create(array $data): SystemColorResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->log($name, $result->getName(), $this->entity, 'created');

        return new SystemColorResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return SystemColorResource
     *
     * @throws Exception
     */
    public function update($id, array $data): SystemColorResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->log($name, $result->getName(), $this->entity, 'updated');

        return new SystemColorResource($result->fresh());

    }

    /**
     * @param int $id
     *
     * @return void
     *
     * @throws Exception
     */
    public function delete($id): void
    {
        $this->defineUserData();

        $model = $this->model::findOrFail($id);

        $model->delete();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->log($name, $model->getName(), $this->entity, 'deleted');
    }
}
