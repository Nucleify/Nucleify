<?php

namespace App\Models\Task;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int id
 * @property int creator_id
 * @property int assignee_id
 * @property string title
 * @property string description
 * @property string start_date
 * @property string end_date
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getCreatorId
 * @property int getAssigneeId
 * @property string getTitle
 * @property string getDescription
 * @property string getStartDate
 * @property string getEndDate
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property Builder scopeGetById
 * @property Builder scopeGetByCreatorId
 * @property Builder scopeGetByAssigneeId
 * @property Builder scopeGetByTitle
 * @property Builder scopeGetByDescription
 * @property Builder scopeGetByStartDate
 * @property Builder scopeGetByEndDate
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 * @property BelongsTo creator
 * @property BelongsTo assignee
 * @property BelongsToMany collaborators
 */
class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'assignee_id',
        'title',
        'description',
        'start_date',
        'end_date'
    ];


    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }
    public function getCreatorId(): int
    {
        return $this->creator_id;
    }
    public function getAssigneeId(): int
    {
        return $this->assignee_id;
    }
    public function getTitle(): string
    {
        return $this->title;
    }
    public function getDescription(): string
    {
        return $this->description;
    }
    public function getStartDate(): string
    {
        return $this->start_date;
    }
    public function getEndDate(): string
    {
        return $this->end_date;
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
    public function scopeGetByCreatorId(Builder $query, int $creatorId): Builder
    {
        return $query->where('creator_id', $creatorId);
    }
    public function scopeGetByAssigneeId(Builder $query, int $assigneeId): Builder
    {
        return $query->where('assignee_id', $assigneeId);
    }
    public function scopeGetByTitle(Builder $query, string $title): Builder
    {
        return $query->where('title', $title);
    }
    public function scopeGetByDescription(Builder $query, string $description): Builder
    {
        return $query->where('description', $description);
    }
    public function scopeGetByStartDate(Builder $query, string $startDate): Builder
    {
        return $query->where('start_date', $startDate);
    }
    public function scopeGetByEndDate(Builder $query, string $endDate): Builder
    {
        return $query->where('end_date', $endDate);
    }
    public function scopeGetByCreatedAt(Builder $query, string $createdAt): Builder
    {
        return $query->whereDate('created_at', $createdAt);
    }
    public function scopeGetByUpdatedAt(Builder $query, string $updatedAt): Builder
    {
        return $query->whereDate('updated_at', $updatedAt);
    }

    /**
     *  Relational functions
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }
    public function collaborators(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'task_collaborators', 'task_id', 'collaborator_id');
    }
}

