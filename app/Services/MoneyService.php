<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Models\Money;
use App\Transformers\MoneyTransformer;

class MoneyService
{
    public function __construct(
        private readonly Money $model,
        protected string $entity = 'money',
        private readonly ActivityLoggerService $logger = new ActivityLoggerService()
    ) {}

    public function getAll(Request $request)
    {
        $causer = auth()->user();

        // Get the URL from which the request was sent
        $referer = $request->header('referer');

        switch (true) {
            // If the URL not contains '/money', fetch money based on user role
            case $referer && !str_contains($referer, '/money'):
                switch (true) {
                    case $causer->isUser():
                        $money = $this->model
                            ->where('user_id', $causer->id)
                            ->get();

                        $this->logger->logIndex($causer, $this->entity);
                        break;

                    default:
                        $money = $this->model->all();

                        $this->logger->logIndex($causer, $this->entity, true);
                        break;
                }
                break;

            // Default behavior if the URL contains '/money'
            default:
                $money = $this->model
                    ->where('user_id', $causer->id)
                    ->get();

                $this->logger->logIndex($causer, $this->entity);
                break;
        }

        return fractal()
            ->collection($money)
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    public function getById($id): array
    {
        $causer = auth()->user();

        $model = match (true) {
            $causer->isUser() => $this->model
                ->where('user_id', $causer->id)
                ->findOrFail($id),

            default => $this->model::findOrFail($id)
        };

        $this->logger->log($causer, $model, $this->entity, 'showed');

        return fractal()
            ->item($model)
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $causer = auth()->user();

        $model = $this->model::create($data);

        $this->logger->log($causer, $model, $this->entity, 'created');

        return fractal()
            ->item($model)
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    public function update($id, array $data): array
    {
        $causer = auth()->user();

        $model = match (true) {
            $causer->isUser() => $this->model
                ->where('user_id', $causer->id)
                ->findOrFail($id),

            default => $this->model::findOrFail($id)
        };

        $model->update($data);

        $this->logger->log($causer, $model, $this->entity, 'updated');

        return fractal()
            ->item($model->fresh())
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    public function delete($id): void
    {
        $causer = auth()->user();

        $model = match (true) {
            $causer->isUser() => $this->model
                ->where('user_id', $causer->id)
                ->findOrFail($id),

            default => $this->model::findOrFail($id)
        };

        $model->delete();

        $this->logger->log($causer, $model, $this->entity, 'deleted');
    }
}
