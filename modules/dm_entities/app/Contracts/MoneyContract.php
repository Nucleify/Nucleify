<?php

namespace App\Contracts;

interface MoneyContract
{
    public function getId(): int;

    public function getUserId(): int;

    public function getSender(): string;

    public function getReceiver(): string;

    public function getCount(): int;

    public function getTitle(): string;

    public function getDescription(): ?string;

    public function getCategory(): ?string;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
