<?php

namespace App\Contracts;

interface PageBuilderVersionContract
{
    public function getId(): int;

    public function getPageId(): int;

    public function getVersion(): int;

    public function getLayoutJson(): array;

    public function getChecksum(): string;

    public function getIsPublished(): bool;

    public function getCreatedBy(): int;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
