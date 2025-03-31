<?php

namespace App\Contracts;

interface FeatureContract
{
    /**
     * @return int
     */
    public function getId(): int;

    /**
     * @return string
     */
    public function getIcon(): string;
    
    /**
     * @return string
     */
    public function getHeader(): string;

    /**
     * @return string
     */
    public function getDescription(): string;

    /**
     * @return string
     */
    public function getCategory(): string;
    
    /**
     * @return string
     */
    public function getCreatedAt(): string;

    /**
     * @return string
     */
    public function getUpdatedAt(): string;
}
