<?php

namespace App\Contracts\Structural;


interface ColorContract
{
    /**
     * @return int
     */
    public function getId(): int;

    /**
     * @return int
     */
    public function getUserId(): int;

    /**
     * @return string
     */
    public function getEntity(): string;

    /**
     * @return string
     */
    public function getValue(): string;

    /**
     * @return bool
     */
    public function getNew(): bool;

    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}
