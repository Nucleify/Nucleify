<?php

namespace App\Models;

use App\Contracts\ArticleShouldReceiveFields;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int user_id
 * @property string title
 * @property string description
 * @property string|null category
 * @property DateTime created_at
 * @property DateTime updated_at
 * @property string getTitle
 * @property string getDescription
 * @property string|null getCategory
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property Builder scopeGetByTitle
 * @property Builder scopeGetByDescription
 * @property Builder scopeGetByCategory
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */
class Article extends Model implements ArticleShouldReceiveFields
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'category',
    ];

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }
    public function getTitle(): string
    {
        return $this->title;
    }
    public function getDescription(): string
    {
        return $this->description;
    }
    public function getCategory(): string|null
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
