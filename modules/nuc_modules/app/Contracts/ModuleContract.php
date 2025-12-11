<?php

namespace App\Contracts;

interface ModuleContract
{
    public function getId(): int;

    public function getName(): string;

    public function getDescription(): string;

    public function getCategory(): string;

    public function getVersion(): string;

    public function getEnabled(): bool;

    public function getInstalled(): bool;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
