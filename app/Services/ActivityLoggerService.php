<?php

namespace App\Services;

class ActivityLoggerService
{
    public function log($causer, $model, $entity, $method): string
    {
        $message = $this->constructLogMessage($causer, $model, $entity, $method);

        activity()->log($message);

        return $message;
    }

    public function logMessage($message): string {
        activity()->log($message);

        return $message;
    }

    public function constructLogMessage($causer, $model, $entity, $method): string
    {
        switch ($entity) {
            case 'Article':
                return "$entity: ''$model->title'' has been $method by $causer->name";
            case 'Contact':
                return "$entity: ''$model->first_name $model->last_name'' has been $method by $causer->name";
            case 'User':
                return "$entity: ''$model->name'' has been $method by $causer->name";
            default:
                return 0;
        }
    }
}
