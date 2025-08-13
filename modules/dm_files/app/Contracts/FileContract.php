<?php

namespace App\Contracts;

interface FileContract
{
    public function getId(): int;

    public function getUserId(): int;

    public function getPath(): string;

    public function getMimeType(): string;

    public function getSize(): string;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
