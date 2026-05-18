<?php

namespace App\Contracts;

interface QuestionContract
{
    public function getId(): int;

    public function getIndex(): int;

    public function getContent(): string;

    public function getAnswer(): string;

    public function getCategory(): ?string;

    public function getOnSite(): bool;

    public function getDisplay(): bool;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
