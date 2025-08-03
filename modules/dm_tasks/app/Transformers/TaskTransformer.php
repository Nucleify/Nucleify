<?php

namespace App\Transformers;

use App\Contracts\TaskContract;
use League\Fractal\TransformerAbstract;

class TaskTransformer extends TransformerAbstract
{
    public function transform(TaskContract $model): array
    {
        return [
            'id' => $model->getId(),
            'user_id' => $model->getUserId(),
            'assignee_id' => $model->getAssigneeId(),
            'collaborator_ids' => $model->getCollaboratorIds(),
            'title' => $model->getTitle(),
            'description' => $model->getDescription(),
            'start_date' => $model->getStartDate(),
            'end_date' => $model->getEndDate(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
