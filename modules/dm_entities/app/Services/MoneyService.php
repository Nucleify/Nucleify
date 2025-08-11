<?php

namespace App\Services;

use App\Models\Money;
use App\Resources\MoneyResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MoneyService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Money $model,
        protected string $entity = 'money',
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

        $result = $this->isCauserStaff && $this->isRefererAdmin
            ? $this->model->all()
            : $this->model->where('user_id', $this->causer->id)->get();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererAdmin);

        return MoneyResource::collection($result);
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

        $result = $this->isCauserStaff && $this->isRefererAdmin
            ? $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->count()
            : $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->where('user_id', $this->causer->id)
                ->count();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererAdmin);

        return $result;
    }

    /**
     * @param int $id
     *
     * @return MoneyResource
     *
     * @throws Exception
     */
    public function show($id): MoneyResource
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'showed');

        return new MoneyResource($result);
    }

    /**
     * @param array $data
     *
     * @return MoneyResource
     *
     * @throws Exception
     */
    public function create(array $data): MoneyResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'created');

        return new MoneyResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return MoneyResource
     *
     * @throws Exception
     */
    public function update($id, array $data): MoneyResource
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'updated');

        return new MoneyResource($result->fresh());
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

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $result->delete();

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'deleted');
    }
}
