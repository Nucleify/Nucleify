<?php

namespace App\Contracts;

interface DocumentationContract
{
    public function getId(): int;

    public function getName(): string;

    public function getCategory(): ?string;

    public function getVersion(): ?string;

    public function getFile(): string;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
