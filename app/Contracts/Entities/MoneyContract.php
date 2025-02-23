<?php

namespace App\Contracts\Entities;


interface MoneyContract
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
    public function getSender(): string;

    /**
     * @return string
     */
    public function getReceiver(): string;

    /**
     * @return int
     */
    public function getCount(): int;

    /**
     * @return string
     */
    public function getTitle(): string;

    /**
     * @return string|null
     */
    public function getDescription(): string | null;

    /**
     * @return string|null
     */
    public function getCategory(): string | null;

    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}
