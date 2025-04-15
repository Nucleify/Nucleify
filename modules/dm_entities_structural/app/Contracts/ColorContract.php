<?php

namespace App\Contracts;

interface ColorContract
{
    public function getId(): int;

    public function getUserId(): int;

    public function getEntity(): string;

    public function getValue(): string;

    public function getNew(): bool;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
