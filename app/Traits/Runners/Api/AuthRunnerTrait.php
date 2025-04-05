<?php

namespace App\Traits\Runners\Api;

use Exception;

use App\Services\LoggerService;
use App\Traits\Setters\UserSetterTrait;

trait AuthRunnerTrait
{
    use UserSetterTrait;

    /**
     * @param LoggerService $logger
     */
    public function __construct(
        private readonly LoggerService $logger = new LoggerService()
    ) {}

    /**
     * @param string $api
     *
     * @return void
     *
     * @throws Exception
     */
    public function checkPermissions(string $api): void
    {
        if (!$this->isCauserStaff) {
            $this->unauthorizedApiError($api);
        }
    }

    /**
     * @param string $api
     *
     * @return void
     *
     * @throws Exception
     */
    public function unauthorizedApiError(string $api): void
    {
        $this->logger->logAndThrowUnauthorizedApi($this->causer, $api);
    }
}
