<?php

namespace App\Services;

use App\Models\Link;
use App\Resources\LinkResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LinkService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Link $model,
        protected string $entity = 'link',
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

        return LinkResource::collection($result);
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

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched questions by category: ' . $category . '.');

        return LinkResource::collection($result);
    }

    /**
     * @param string $site
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getSiteLinks(string $site): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched questions by site: ' . $site . '.');

        return LinkResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return LinkResource
     *
     * @throws Exception
     */
    public function show($id): LinkResource
    {
        $result = $this->model::findOrFail($id);

        return new LinkResource($result);
    }

    /**
     * @param array $data
     *
     * @return LinkResource
     *
     * @throws Exception
     */
    public function create(array $data): LinkResource
    {
        $result = $this->model::create($data);

        return new LinkResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return LinkResource
     *
     * @throws Exception
     */
    public function update($id, array $data): LinkResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->get(), $this->entity, 'updated');

        return new LinkResource($result->fresh());
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

        $this->logger->log($this->causer->name, $model->getHref(), $this->entity, 'deleted');
    }
}
