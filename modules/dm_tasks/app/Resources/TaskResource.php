<?php

namespace App\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getId(),
            'user_id' => $this->getUserId(),
            'assignee_id' => $this->getAssigneeId(),
            'collaborator_ids' => $this->getCollaboratorIds(),
            'title' => $this->getTitle(),
            'description' => $this->getDescription(),
            'start_date' => $this->getStartDate(),
            'end_date' => $this->getEndDate(),
            'created_at' => $this->getCreatedAt(),
            'updated_at' => $this->getUpdatedAt(),
        ];
    }
}
