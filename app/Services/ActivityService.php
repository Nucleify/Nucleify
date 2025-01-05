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

    public function getAll(): array
    {
        $causer = auth()->user();

        $model = match (true) {
            $causer->isUser() => $this->model
                ->where('causer_id', $causer->id)
                ->get(),

            default => $this->model->all()
        };

        return fractal()
            ->collection($model)
            ->transformWith(new ActivityTransformer())
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function getById(int $id): array
    {
        $causer = auth()->user();
        $model = $this->model::findOrFail($id);

        switch (true) {
            case $causer->isUser():
                if ($causer->id !== $model->causer_id) {
                    $this->logger->logAndThrow(
                        $causer->name . ' tried to fetch other user activity log, but he doesn\'t have permissions',
                        'You don\'t have permission to fetch other users activity log'
                    );
                }
                break;

            default:
//                ActivityLogger::logMessage(
//                    $causer->name . ' has fetched activity log "'. $model->description .'"'. 'from: '. User::findOrFail($model->causer_id)
//                );
        }

        return fractal()
            ->item($model)
            ->transformWith(new ActivityTransformer())
            ->toArray()['data'];
    }

    public function delete($id): void
    {
        $causer = auth()->user();

        $model = match (true) {
            $causer->isUser() => $this->model
                ->where('causer_id', $causer->id)
                ->findOrFail($id),

            default => $this->model->findOrFail($id)
        };

        $model->delete();

//        if (strpos($model->description, '"'. $causer->name. '" has deleted his activity log with ID: "') === false) {
//            ActivityLogger::logMessage(
//                $causer->name . ' has deleted his activity log with ID: "'. $id .'" and description: "'. $model->description
//            );
//        }
    }
}
