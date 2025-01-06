<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Models\Money;
use App\Transformers\MoneyTransformer;

class MoneyService
{
    /**
     * @param Money $model
     * @param string $entity
     * @param ActivityLoggerService $logger
     */
    public function __construct(
        private readonly Money $model,
        protected string $entity = 'money',
        private readonly ActivityLoggerService $logger = new ActivityLoggerService()
    ) {}

    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function getAll(Request $request)
    {
        $causer = auth()->user();

        $referer = $request->header('referer');

        $money = $referer && !str_contains($referer, '/money')
            ? ($causer->isUser()
                ? $this->model->where('user_id', $causer->id)->get()
                : $this->model->all())
            : $this->model->where('user_id', $causer->id)->get();

        $this->logger->logIndex($causer->name, $this->entity, !$referer || str_contains($referer, '/money'));

        return fractal()
            ->collection($money)
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     *
     * @return array
     */
    public function getById($id): array
    {
        $causer = auth()->user();

        $model = $causer->isUser()
            ? $this->model->where('user_id', $causer->id)->findOrFail($id)
            : $this->model::findOrFail($id);

        $this->logger->log($causer->name, $model->title, $this->entity, 'showed');

        return fractal()
            ->item($model)
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public function create(array $data): array
    {
        $causer = auth()->user();

        $model = $this->model::create($data);

        $this->logger->log($causer->name, $model->title, $this->entity, 'created');

        return fractal()
            ->item($model)
            ->transformWith(new MoneyTransformer())
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
        $causer = auth()->user();

        $model = $causer->isUser()
            ? $this->model->where('user_id', $causer->id)->findOrFail($id)
            : $this->model::findOrFail($id);

        $model->update($data);

        $this->logger->log($causer->name, $model->title, $this->entity, 'updated');

        return fractal()
            ->item($model->fresh())
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     *
     * @return void
     */
    public function delete($id): void
    {
        $causer = auth()->user();

        $model = $causer->isUser()
            ? $this->model->where('user_id', $causer->id)->findOrFail($id)
            : $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($causer->name, $model->title, $this->entity, 'deleted');
    }
}
