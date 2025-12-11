<?php

namespace App\Services;

use Exception;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Str;

class LoggerService
{
    /**
     * @param  string  $causer
     * @param  string  $model
     * @param  string  $entity
     * @param  string  $method
     *
     * @return string
     */
    public function log(string $causer, string $model, string $entity, string $method): string
    {
        $message = $this->constructLogMessage($causer, $model, $entity, $method);

        activity()->log($message);

        return $message;
    }

    /**
     * @param  string  $message
     *
     * @return string
     */
    public function logMessage(string $message): string
    {
        activity()->log($message);

        return $message;
    }

    /**
     * @param  string  $logMessage
     * @param  string  $exceptionMessage
     *
     * @return void
     *
     * @throws Exception
     */
    public function logAndThrow(string $logMessage, string $exceptionMessage): void
    {
        $this->logMessage($logMessage);

        throw new Exception($exceptionMessage);
    }

    /**
     * @param  Authenticatable  $causer
     * @param  string  $api
     *
     * @return void
     *
     * @throws Exception
     */
    public function logAndThrowUnauthorizedApi(Authenticatable $causer, string $api): void
    {
        $error = 'unauthorized to use ' . $api . ' API.';

        $this->logMessage("User: ''" . $causer . "'' was " . $error);

        throw new Exception('You are ' . $error);
    }

    /**
     * @param  string  $causer
     * @param  string|null  $model
     * @param  string  $entity
     * @param  string  $method
     *
     * @return string
     */
    public function constructLogMessage(string $causer, ?string $model, string $entity, string $method): string
    {
        if (!in_array($entity, ['activity', 'article', 'contact', 'file', 'module', 'money', 'question', 'technology', 'user', 'system color', 'user color'])) {
            return false;
        }

        $pascalCase = Str::studly($entity);

        return "$pascalCase: ''$model'' has been $method by ''$causer''";
    }

    /**
     * @param  string  $causer
     * @param  string  $entity
     * @param  bool  $all
     *
     * @return string
     */
    public function logIndex(string $causer, string $entity, bool $all = false): string
    {
        $message = $this->constructLogIndexMessage($causer, $entity, $all);

        activity()->log($message);

        return $message;
    }

    /**
     * @param  string  $causer
     * @param  string  $entity
     * @param  bool  $all
     *
     * @return string
     */
    public function constructLogIndexMessage(string $causer, string $entity, bool $all): string
    {
        $entity = $entity === 'money'
            ? $entity
            : ($entity === 'activity'
                ? 'activities'
                : ($entity === 'technology' ? 'technologies' : $entity . 's'));

        return match ($all) {
            true => "User: ''$causer'' has fetched all $entity for all users",
            default => "User: ''$causer'' has fetched all his $entity",
        };
    }

    /**
     * @param  string  $causer
     * @param  string  $entity
     * @param  bool  $all
     *
     * @return string
     */
    public function logCountByCreatedLastWeek(string $causer, string $entity, bool $all = false): string
    {
        $message = $this->constructLogCountByCreatedLastWeekMessage($causer, $entity, $all);

        activity()->log($message);

        return $message;
    }

    /**
     * @param  string  $causer
     * @param  string  $entity
     * @param  bool  $all
     *
     * @return string
     */
    public function constructLogCountByCreatedLastWeekMessage(string $causer, string $entity, bool $all): string
    {
        $entity = $entity === 'money'
            ? $entity
            : ($entity === 'activity'
                ? 'activities'
                : ($entity === 'technology' ? 'technologies' : $entity . 's'));

        return match ($all) {
            true => "User: ''$causer'' has counted $entity for all users",
            default => "User: ''$causer'' has counted all his $entity",
        };
    }
}
