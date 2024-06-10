<?php

namespace App\Services;

use Exception;

use App\Facades\ActivityLogger;

use App\Transformers\ActivityTransformer;
use Spatie\Activitylog\Models\Activity;

class ActivityService
{
    public function __construct(private readonly Activity $model){}

    public function getAll(): array
    {
        $causer = auth()->user();

        switch (true) {
            case $causer->isUser():
                $model = $this->model
                    ->where('causer_id', $causer->id)
                    ->get();

//                ActivityLogger::logMessage(
//                    $causer->name . ' has fetched his activity log data'
//                );
                break;

            default:
                $model = $this->model->all();

//                ActivityLogger::logMessage(
//                    $causer->name . ' has fetched all activity log data'
//                );
                break;
        }

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
                    ActivityLogger::logMessage(
                        $causer->name . ' tried to fetch other user activity log, but he doesn\'t have permissions'
                    );

                    throw new Exception('You don\'t have permission to fetch other users activity log');
                }

            default:
//                ActivityLogger::logMessage(
//                    $causer->name . ' has fetched activity log "'. $model->description .'"'. 'from: '. User::findOrFail($model->causer_id)
//                );

                return fractal()
                    ->item($model)
                    ->transformWith(new ActivityTransformer())
                    ->toArray()['data'];
        }
    }

    public function delete($id): void
    {
        $causer = auth()->user();

        switch (true) {
            case $causer->isUser():
                $model = $this->model
                    ->where('causer_id', $causer->id)
                    ->findOrFail($id);
                break;

            default:
                $model = $this->model->findOrFail($id);
                break;
        }
        $model->delete();

//        if (strpos($model->description, '"'. $causer->name. '" has deleted his activity log with ID: "') === false) {
//            ActivityLogger::logMessage(
//                $causer->name . ' has deleted his activity log with ID: "'. $id .'" and description: "'. $model->description
//            );
//        }
    }
}
