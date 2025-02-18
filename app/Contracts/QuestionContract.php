<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface QuestionContract 
{
  /**
   * @return int
   */
  public function getId(): int;

  /**
   * @return int
   */
  public function getUserId(): int;
  
  /**
   * @return int
   */
  public function getIndex(): int;

  /**
   * @return string 
   */
  public function getContent(): string;

  /**
   * @return string
   */
  public function getAnswer(): string;

  /**
   * @return string|null
   */
  public function getCategory(): string | null;

  /**
   * @param Builder
   * @param string|null
   * 
   * @return Builder
   */
  public function scopeGetByCategory(Builder $query, ?string $category): Builder;

  /**
   * @return bool
   */
  public function getOnSite(): bool;

  /**
   * @return bool
   */
  public function getDisplay(): bool;

  /**
   * @return string
   */
  public function getCreatedAt(): string;

  /**
   * @return string
   */
  public function getUpdatedAt(): string;
}