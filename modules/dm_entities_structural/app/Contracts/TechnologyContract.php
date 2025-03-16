<?php

namespace App\Contracts;

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
    public function getLabel(): string;

    /**
     * @return string|null
     */
    public function getDescription(): string | null;

  /**
   * @return string
   */
  public function getHref(): string;

  /**
   * @return string
   */
  public function getSrc(): string;

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
