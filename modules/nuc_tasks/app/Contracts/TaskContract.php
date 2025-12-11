<?php

namespace App\Contracts;

interface TaskContract
{
    public function getId(): int;

    public function getUserId(): int;

    public function getAssigneeId(): ?int;

    public function getCollaboratorIds(): ?string;

    public function getTitle(): string;

    public function getDescription(): ?string;

    public function getStartDate(): string;

    public function getEndDate(): ?string;

    public function getCreatedAt(): string;

    public function getUpdatedAt(): string;
}
