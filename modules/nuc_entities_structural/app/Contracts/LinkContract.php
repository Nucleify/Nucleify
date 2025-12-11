<?php

namespace App\Contracts;

interface LinkContract
{
    public function getId(): int;

    public function getDownload(): ?string;

    public function getHref(): string;

    public function getSrc(): ?string;

    public function getIcon(): ?string;

    public function getCategory(): string;

    public function getHreflang(): ?string;

    public function getMedia(): ?string;

    public function getPing(): ?string;

    public function getReferrerPolicy(): ?string;

    public function getRel(): ?string;

    public function getTarget(): ?string;

    public function getType(): ?string;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
