<?php

namespace App\Contracts;


interface ArticleContract
{
    public function getId(): int;
    public function getTitle(): string;
    public function getDescription(): string;
    public function getCategory(): string | null;
    public function getCreatedAt(): string;
    public function getUpdatedAt(): string;
}
