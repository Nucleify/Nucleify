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
        return match ($entity) {
            'Article' => "$entity: ''$model->title'' has been $method by $causer->name",
            'Contact' => "$entity: ''$model->first_name $model->last_name'' has been $method by $causer->name",
            'User' => "$entity: ''$model->name'' has been $method by $causer->name",
            default => 0,
        };
    }

    public function logIndex($causer, $entity, $all = false): string
    {
        $message = $this->constructLogIndexMessage($causer, $entity, $all);

        activity()->log($message);

        return $message;
    }

    public function constructLogIndexMessage($causer, $entity, $all): string
    {
        $entity = $entity === 'money' ? $entity : $entity . 's';

        return match ($all) {
            true => "$causer->name has fetched all $entity for all users",
            default => "$causer->name has fetched all his $entity",
        };
    }
}
