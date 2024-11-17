<?php

namespace App\Contracts;

use DateTime;

interface MoneyContract
{
    public function getCount(): int;
    public function getId(): int;
    public function getSenderId(): int;
    public function getReceiverId(): int;
    public function getTitle(): string;
    public function getDescription(): string | null;
    public function getCategory(): string | null;
    public function getCreatedAt(): string;
    public function getUpdatedAt(): string;
}
