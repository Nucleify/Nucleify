<?php

namespace App\Contracts;

interface CardContract
{
    public function getId(): int;

    public function getSrc(): string;

    public function getTitle(): string;

    public function getDescription(): string;

    public function getCategory(): ?string;

    public function getComponent(): string;

    public function getDisplay(): bool;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
