<?php

namespace App\Services;

use App\Models\Card;
use App\Resources\CardResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CardService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Card $model,
        protected string $entity = 'card',
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

        return CardResource::collection($result);
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

        $this->logger->logMessage($this->causer->name . ' fetched cards by category: ' . $category . '.');

        return CardResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return CardResource
     *
     * @throws Exception
     */
    public function show($id): CardResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'showed');

        return new CardResource($result);
    }

    /**
     * @param array $data
     *
     * @return CardResource
     *
     * @throws Exception
     */
    public function create(array $data): CardResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'created');

        return new CardResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return CardResource
     *
     * @throws Exception
     */
    public function update($id, array $data): CardResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'updated');

        return new CardResource($result->fresh());
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

        $result = $this->model::findOrFail($id);

        $result->delete();

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'deleted');
    }
}
