<?php

namespace App\Contracts;

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
   * @return string
   */
  public function getCreatedAt(): string;

  /**
   * @return string
   */
  public function getUpdatedAt(): string;
}