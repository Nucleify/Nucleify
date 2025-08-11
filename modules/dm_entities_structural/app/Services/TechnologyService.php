<?php

namespace App\Services;

use App\Models\Technology;
use App\Resources\TechnologyResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TechnologyService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Technology $model,
        protected string $entity = 'technology',
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

        $this->logger->logIndex($this->causer->name, $this->entity, true);

        return TechnologyResource::collection($result);
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

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, true);

        return $result;
    }

    /**
     * @param string $category
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getByCategory(string $category): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($category)->get();

        $this->logger->logMessage($this->causer->name . ' fetched technologies by category: ' . $category . '.');

        return TechnologyResource::collection($result);
    }

    /**
     * @param string $site
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getSiteTechnologies(string $site): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched technologies by site: ' . $site . '.');

        return TechnologyResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return TechnologyResource
     *
     * @throws Exception
     */
    public function show($id): TechnologyResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getLabel(), $this->entity, 'showed');

        return new TechnologyResource($result);
    }

    /**
     * @param array $data
     *
     * @return TechnologyResource
     *
     * @throws Exception
     */
    public function create(array $data): TechnologyResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getLabel(), $this->entity, 'created');

        return new TechnologyResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return TechnologyResource
     *
     * @throws Exception
     */
    public function update($id, array $data): TechnologyResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getLabel(), $this->entity, 'updated');

        return new TechnologyResource($result->fresh());
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

        $this->logger->log($this->causer->name, $model->getLabel(), $this->entity, 'deleted');
    }
}
