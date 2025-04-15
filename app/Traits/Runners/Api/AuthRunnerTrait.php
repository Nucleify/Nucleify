<?php

namespace App\Traits\Runners\Api;

use App\Services\LoggerService;
use App\Traits\Setters\UserSetterTrait;
use Exception;

trait AuthRunnerTrait
{
    use UserSetterTrait;

    public function __construct(
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * @throws Exception
     */
    public function checkPermissions(string $api): void
    {
        if (!$this->isCauserStaff) {
            $this->unauthorizedApiError($api);
        }
    }

    /**
     * @throws Exception
     */
    public function unauthorizedApiError(string $api): void
    {
        $this->logger->logAndThrowUnauthorizedApi($this->causer, $api);
    }
}
