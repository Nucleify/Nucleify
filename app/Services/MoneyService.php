<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Facades\ActivityLogger;

use App\Models\Money;
use App\Transformers\MoneyTransformer;

class MoneyService
{
    public function __construct(private readonly Money $model, protected string $entity = 'Money'){}

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
                        $money = $causer
                            ->money()
                            ->where('user_id', $causer->id)
                            ->get();

                        ActivityLogger::logMessage(
                            $causer->name . ' has fetched all his money transactions'
                        );
                        break;

                    default:
                        $money = $this->model->all();
                        ActivityLogger::logMessage(
                            $causer->name . ' has fetched all money transactions for all users'
                        );
                        break;
                }
                break;

            // Default behavior if the URL contains '/money'
            default:
                $money = $causer
                    ->money()
                    ->where('user_id', $causer->id)
                    ->get();

                ActivityLogger::logMessage(
                    $causer->name . ' has fetched all his money transactions'
                );
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

        switch (true) {
            case !$causer->isUser():
                $model = $this->model::findOrFail($id);
                break;

            default:
                $model = $causer
                    ->money()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        ActivityLogger::log($causer, $model, $this->entity, 'showed');

        return fractal()
            ->item($model)
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $causer = auth()->user();

        $model = $this->model::create($data);
        ActivityLogger::log($causer, $model, $this->entity, 'created');

        return fractal()
            ->item($model)
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    public function update($id, array $data): array
    {
        $causer = auth()->user();

        switch (true) {
            case !$causer->isUser():
                $model = $this->model::findOrFail($id);
                break;

            default:
                $model = $causer
                    ->money()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        $model->update($data);
        ActivityLogger::log($causer, $model, $this->entity, 'updated');

        return fractal()
            ->item($model->fresh())
            ->transformWith(new MoneyTransformer())
            ->toArray()['data'];
    }

    public function delete($id): void
    {
        $causer = auth()->user();

        switch (true) {
            case !$causer->isUser():
                $model = $this->model::findOrFail($id);
                break;

            default:
                $model = $causer
                    ->money()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        $model->delete();
        ActivityLogger::log($causer, $model, $this->entity, 'deleted');
    }
}
