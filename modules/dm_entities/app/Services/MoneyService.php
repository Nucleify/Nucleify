<?php

namespace App\Services;

use App\Models\Money;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\MoneyTransformer;
use Illuminate\Http\Request;

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
            ->transformWith(new MoneyTransformer)
            ->toArray()['data'];
    }

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

    public function show($id): array
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new MoneyTransformer)
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new MoneyTransformer)
            ->toArray()['data'];
    }

    public function update($id, array $data): array
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new MoneyTransformer)
            ->toArray()['data'];
    }

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
