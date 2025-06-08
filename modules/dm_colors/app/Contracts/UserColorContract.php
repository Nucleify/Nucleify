<?php

namespace App\Contracts;

interface UserColorContract
{
    public function getId(): int;

    public function getUserId(): int;

    public function getName(): string;

    public function getValue(): string;

    public function getNew(): bool;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
