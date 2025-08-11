<?php

namespace App\Services;

use App\Models\Feature;
use App\Resources\FeatureResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FeatureService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Feature $model,
        protected string $entity = 'feature',
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

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return FeatureResource::collection($result);
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

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)
            ->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererStructural);

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

        $this->logger->logMessage($this->causer->name . ' fetched features by category: ' . $category . '.');

        return FeatureResource::collection($result);
    }

    /**
     * @param string $site
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getSiteFeatures(string $site): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched features by site: ' . $site . '.');

        return FeatureResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return FeatureResource
     *
     * @throws Exception
     */
    public function show($id): FeatureResource
    {
        $result = $this->model::findOrFail($id);

        return new FeatureResource($result);
    }

    /**
     * @param array $data
     *
     * @return FeatureResource
     *
     * @throws Exception
     */
    public function create(array $data): FeatureResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getHeader(), $this->entity, 'created');

        return new FeatureResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return FeatureResource
     *
     * @throws Exception
     */
    public function update($id, array $data): FeatureResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getHeader(), $this->entity, 'updated');

        return new FeatureResource($result->fresh());
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

        $this->logger->log($this->causer->name, $model->getHeader(), $this->entity, 'deleted');
    }
}
