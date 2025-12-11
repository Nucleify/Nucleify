<?php

namespace App\Contracts;

interface TechnologyContract
{
    public function getId(): int;

    public function getLabel(): string;

    public function getDescription(): ?string;

    public function getHref(): string;

    public function getSrc(): string;

    public function getCategory(): ?string;

    public function getDisplay(): bool;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
