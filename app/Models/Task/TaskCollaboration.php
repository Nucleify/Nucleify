<?php

namespace App\Models\Task;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @property int id
 * @property int task_id
 * @property int collaborator_id
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getTaskId
 * @property int getCollaboratorId
 * @property Builder scopeGetById
 * @property Builder scopeGetByTaskId
 * @property Builder scopeGetByCollaboratorId
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */

class TaskCollaboration extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'collaborator_id',
    ];
    protected $table = 'task_collaborations';

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }
    public function getCollaboratorId(): int
    {
        return $this->collaborator_id;
    }
    public function getTaskId(): int
    {
        return $this->task_id;
    }
    public function getCreatedAt(): string
    {
        return $this->created_at;
    }
    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    /**
     *  Scope methods
     */
    public function scopeGetById(Builder $query, int $id): Builder
    {
        return $query->where('id', $id);
    }
    public function scopeGetByCollaboratorId(Builder $query, int $collaboratorId): Builder
    {
        return $query->where('collaborator_id', $collaboratorId);
    }
    public function scopeGetByTaskId(Builder $query, int $taskId): Builder
    {
        return $query->where('task_id', $taskId);
    }
    public function scopeGetByCreatedAt(Builder $query, string $createdAt): Builder
    {
        return $query->whereDate('created_at', $createdAt);
    }
    public function scopeGetByUpdatedAt(Builder $query, string $updatedAt): Builder
    {
        return $query->whereDate('updated_at', $updatedAt);
    }
}
