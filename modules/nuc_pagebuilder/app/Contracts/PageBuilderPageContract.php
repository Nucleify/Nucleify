<?php

namespace App\Contracts;

interface PageBuilderPageContract
{
    public function getId(): int;

    public function getUserId(): int;

    public function getTitle(): string;

    public function getSlug(): string;

    public function getStatus(): string;

    public function getMetaJson(): ?array;

    public function getPublishedVersionId(): ?int;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
