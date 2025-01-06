<?php

namespace App\Services;

use Exception;

use App\Transformers\ActivityTransformer;
use Spatie\Activitylog\Models\Activity;

readonly class ActivityService
{
    public function __construct(
        private Activity $model,
        private ActivityLoggerService $logger = new ActivityLoggerService()
    ) {}

    /**
     * @return array
     */
    public function getAll(): array
    {
        $causer = auth()->user();

        $model = $causer->isUser()
            ? $this->model->where('causer_id', $causer->id)->get()
            : $this->model->all();

        return fractal()
            ->collection($model)
            ->transformWith(new ActivityTransformer())
            ->toArray()['data'];
    }

    /**
     * @param int $id
     *
     * @return array
     *
     * @throws Exception
     */
    public function getById(int $id): array
    {
        $causer = auth()->user();

        $model = $this->model::findOrFail($id);

        if ($causer->isUser() && $causer->id !== $model->causer_id) {
            $this->logger->logAndThrow(
                "User: ''$causer->name'' tried to fetch other user activity log, but he doesn't have permissions",
                "You don't have permission to fetch other users' activity log"
            );
        }

        return fractal()
            ->item($model)
            ->transformWith(new ActivityTransformer())
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
            ? $this->model->where('causer_id', $causer->id)->findOrFail($id)
            : $this->model->findOrFail($id);

        $model->delete();
    }
}
