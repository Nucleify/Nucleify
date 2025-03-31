<?php

namespace App\Contracts;

interface CardContract
{
    /**
     * @return int
     */
    public function getId(): int;

    /**
     * @return string
     */
    public function getSrc(): string;

    /**
     * @return string
     */
    public function getTitle(): string;

    /**
     * @return string
     */
    public function getDescription(): string;

    /**
     * @return string|null
     */
    public function getCategory(): string | null;

    /**
     * @return string
     */
    public function getComponent(): string;

    /**
     * @return bool
     */
    public function getDisplay(): bool;

    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}