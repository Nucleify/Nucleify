<?php

namespace App\Contracts;

use DateTime;

interface MoneyContract
{
    public function getId(): int;
    public function getUserId(): int;
    public function getSender(): string;
    public function getReceiver(): string;
    public function getCount(): int;
    public function getTitle(): string;
    public function getDescription(): string | null;
    public function getCategory(): string | null;
    public function getCreatedAt(): string;
    public function getUpdatedAt(): string;
}
