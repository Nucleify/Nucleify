<?php

namespace App\Contracts;

interface ContactContract
{
    public function getId(): int;

    public function getUserId(): int;

    public function getFirstName(): string;

    public function getLastName(): ?string;

    public function getFullName(): ?string;

    public function getEmail(): ?string;

    public function getPersonalPhone(): ?string;

    public function getWorkPhone(): ?string;

    public function getAddress(): ?string;

    public function getBirthday(): ?string;

    public function getRole(): ?string;

    public function getContactGroups(): ?string;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
