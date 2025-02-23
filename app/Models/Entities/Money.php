<?php

namespace App\Models\Entities;

use App\Contracts\Entities\MoneyContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int user_id
 * @property string sender
 * @property string receiver
 * @property int count
 * @property string title
 * @property string description
 * @property string category
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getUserId
 * @property string getSender
 * @property string getReceiver
 * @property int getCount
 * @property string getTitle
 * @property string getDescription
 * @property string getCategory
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property BelongsTo user
 * @property Builder scopeGetById
 * @property Builder scopeGetBySender
 * @property Builder scopeGetByReceiver
 * @property Builder scopeGetByCount
 * @property Builder scopeGetByTitle
 * @property Builder scopeGetByDescription
 * @property Builder scopeGetByCategory
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */
class Money extends Model implements MoneyContract
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sender',
        'receiver',
        'count',
        'title',
        'description',
        'category'
    ];

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }
    public function getUserId(): int
    {
        return $this->user_id;
    }
    public function getCount(): int
    {
        return $this->count;
    }
    public function getSender(): string
    {
        return $this->sender;
    }
    public function getReceiver(): string
    {
        return $this->receiver;
    }
    public function getTitle(): string
    {
        return $this->title;
    }
    public function getDescription(): string
    {
        return $this->description;
    }
    public function getCategory(): string
    {
        return $this->category;
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
    public function scopeGetByUserId(Builder $query, int $user_id): Builder
    {
        return $query->where('user_id', $user_id);
    }
    public function scopeGetBySender(Builder $query, string $sender): Builder
    {
        return $query->where('sender', $sender);
    }
    public function scopeGetByReceiver(Builder $query, string $receiver): Builder
    {
        return $query->where('receiver', $receiver);
    }
    public function scopeGetByCount(Builder $query, int $count): Builder
    {
        return $query->where('count', $count);
    }
    public function scopeGetByTitle(Builder $query, string $title): Builder
    {
        return $query->where('title', $title);
    }
    public function scopeGetByDescription(Builder $query, string $description): Builder
    {
        return $query->where('description', $description);
    }
    public function scopeGetByCategory(Builder $query, ?string $category): Builder
    {
        return $query->where('category', $category);
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
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

