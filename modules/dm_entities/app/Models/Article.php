<?php

namespace App\Models;

use App\Contracts\ArticleContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int user_id
 * @property string title
 * @property string description
 * @property string|null category
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getUserId
 * @property string getTitle
 * @property string getDescription
 * @property string|null getCategory
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property Builder scopeGetById
 * @property Builder scopeGetByUserId
 * @property Builder scopeGetByTitle
 * @property Builder scopeGetByDescription
 * @property Builder scopeGetByCategory
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */
class Article extends Model implements ArticleContract
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

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getCategory(): ?string
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
    public function scopeGetById(Builder $query, int $parameter): Builder
    {
        return $query->where('id', $parameter);
    }

    public function scopeGetByUserId(Builder $query, int $parameter): Builder
    {
        return $query->where('user_id', $parameter);
    }

    public function scopeGetByTitle(Builder $query, string $parameter): Builder
    {
        return $query->where('title', $parameter);
    }

    public function scopeGetByDescription(Builder $query, string $parameter): Builder
    {
        return $query->where('description', $parameter);
    }

    public function scopeGetByCategory(Builder $query, ?string $parameter): Builder
    {
        return $query->where('category', $parameter);
    }

    public function scopeGetByCreatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('created_at', $parameter);
    }

    public function scopeGetByUpdatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('updated_at', $parameter);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
