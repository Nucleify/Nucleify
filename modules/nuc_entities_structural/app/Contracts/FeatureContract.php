<?php

namespace App\Contracts;

interface FeatureContract
{
    public function getId(): int;

    public function getIcon(): string;

    public function getHeader(): string;

    public function getDescription(): string;

    public function getCategory(): string;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
