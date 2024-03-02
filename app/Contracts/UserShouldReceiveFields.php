<?php

namespace App\Contracts;


interface UserShouldReceiveFields
{
    public function getId(): int;
    public function getName(): string;
    public function getEmail(): string;
    public function getRole(): string;
    public function getCreatedAt(): string;
    public function getUpdatedAt(): string;
}
