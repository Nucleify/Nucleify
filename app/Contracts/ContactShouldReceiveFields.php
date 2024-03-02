<?php

namespace App\Contracts;


interface ContactShouldReceiveFields
{
    public function getId(): int;
    public function getUserId(): int;
    public function getFirstName(): string;
    public function getLastName(): string|null;
    public function getFullName(): string|null;
    public function getEmail(): string|null;
    public function getPersonalPhone(): string|null;
    public function getWorkPhone(): string|null;
    public function getAddress(): string|null;
    public function getBirthday(): string|null;
    public function getRole(): string|null;
    public function getContactGroups(): array|null;
    public function getCreatedAt(): string;
    public function getUpdatedAt(): string;
}
