<?php

namespace App\Models;

use App\Contracts\MoneyContract;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int count
 * @property int sender_id
 * @property int receiver_id
 * @property string title
 * @property string description
 * @property string category
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getCount
 * @property int getSenderId
 * @property int getReceiverId
 * @property string getTitle
 * @property string getDescription
 * @property string getCategory
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property BelongsTo sender
 * @property BelongsTo receiver
 * @property Builder scopeGetById
 * @property Builder scopeGetByCount
 * @property Builder scopeGetBySenderId
 * @property Builder scopeGetByReceiverId
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
        'count',
        'sender_id',
        'receiver_id',
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

    public function getCount(): int
    {
        return $this->count;
    }
    public function getSenderId(): int
    {
        return $this->sender_id;
    }
    public function getReceiverId(): int
    {
        return $this->receiver_id;
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
    public function scopeGetByCount(Builder $query, int $count): Builder
    {
        return $query->where('count', $count);
    }
    public function scopeGetBySenderId(Builder $query, int $sender_id): Builder
    {
        return $query->where('sender_id', $sender_id);
    }
    public function scopeGetByReceiverId(Builder $query, int $receiver_id): Builder
    {
        return $query->where('receiver_id', $receiver_id);
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
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}

