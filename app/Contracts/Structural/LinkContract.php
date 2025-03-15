<?php

namespace App\Contracts\Structural;

interface LinkContract
{
    /**
     * @return int
     */
    public function getId(): int;

    /**
     * @return string|null
     */
    public function getDownload(): ?string;

    /**
     * @return string
     */
    public function getHref(): string;

    /**
     * @return string|null
     */
    public function getSrc(): ?string;

    /**
     * @return string|null
     */
    public function getIcon(): ?string;

    /**
     * @return string
     */
    public function getCategory(): string;

    /**
     * @return string|null
     */
    public function getHreflang(): ?string;

    /**
     * @return string|null
     */
    public function getMedia(): ?string;

    /**
     * @return string|null
     */
    public function getPing(): ?string;

    /**
     * @return string|null
     */
    public function getReferrerPolicy(): ?string;

    /**
     * @return string|null
     */
    public function getRel(): ?string;

    /**
     * @return string|null
     */
    public function getTarget(): ?string;

    /**
     * @return string|null
     */
    public function getType(): ?string;

    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}
