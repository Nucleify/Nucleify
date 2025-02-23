<?php

namespace App\Contracts\Entities;


interface ContactContract
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
    public function getFirstName(): string;

    /**
     * @return string|null
     */
    public function getLastName(): string|null;

    /**
     * @return string|null
     */
    public function getFullName(): string|null;

    /**
     * @return string|null
     */
    public function getEmail(): string|null;

    /**
     * @return string|null
     */
    public function getPersonalPhone(): string|null;

    /**
     * @return string|null
     */
    public function getWorkPhone(): string|null;

    /**
     * @return string|null
     */
    public function getAddress(): string|null;

    /**
     * @return string|null
     */
    public function getBirthday(): string|null;

    /**
     * @return string|null
     */
    public function getRole(): string|null;

    /**
     * @return string|null
     */
    public function getContactGroups(): string|null;

    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}
