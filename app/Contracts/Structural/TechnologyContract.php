<?php

namespace App\Contracts\Structural;

interface TechnologyContract
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
   * @return string
   */
  public function getHref(): string;

  /**
   * @return string
   */
  public function getSrc(): string;

  /**
   * @return string
   */
  public function getLabel(): string;

  /**
   * @return string
   */
  public function getDescription(): string;

  /**
   * @return string|null
   */
  public function getCategory(): string | null;

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
