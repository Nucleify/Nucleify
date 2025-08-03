<?php

namespace App\Models;

use App\Contracts\TaskContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int user_id
 * @property int assignee_id
 * @property array collaborator_ids
 * @property string title
 * @property string description
 * @property string start_date
 * @property string end_date
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getUserId
 * @property int getAssigneeId
 * @property array getCollaboratorIds
 * @property string getTitle
 * @property string getDescription
 * @property string getStartDate
 * @property string getEndDate
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property BelongsTo user
 * @property Builder scopeGetById
 * @property Builder scopeGetByUserId
 * @property Builder scopeGetByAssigneeId
 * @property Builder scopeGetByTitle
 * @property Builder scopeGetByStartDate
 * @property Builder scopeGetByEndDate
 */
class Task extends Model implements TaskContract
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'assignee_id',
        'collaborator_ids',
        'title',
        'description',
        'start_date',
        'end_date',
    ];

    /**
     * Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function getAssigneeId(): ?int
    {
        return $this->assignee_id;
    }

    public function getCollaboratorIds(): ?string
    {
        return $this->collaborator_ids;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getStartDate(): string
    {
        return $this->start_date;
    }

    public function getEndDate(): ?string
    {
        return $this->end_date;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at->toDateTimeString();
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at->toDateTimeString();
    }

    /**
     * Scope methods
     */
    public function scopeGetById(Builder $query, int $parameter): Builder
    {
        return $query->where('id', $parameter);
    }

    public function scopeGetByUserId(Builder $query, int $parameter): Builder
    {
        return $query->where('user_id', $parameter);
    }

    public function scopeGetByAssigneeId(Builder $query, ?int $parameter): Builder
    {
        return $query->where('assignee_id', $parameter);
    }

    public function scopeGetByTitle(Builder $query, string $parameter): Builder
    {
        return $query->where('title', $parameter);
    }

    public function scopeGetByStartDate(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('start_date', $parameter);
    }

    public function scopeGetByEndDate(Builder $query, ?string $parameter): Builder
    {
        return $query->whereDate('end_date', $parameter);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
