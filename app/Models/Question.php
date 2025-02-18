<?php

namespace App\Models;

use App\Contracts\QuestionContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int user_id
 * @property int index
 * @property string content
 * @property string answer
 * @property string|null category
 * @property boolean on_site
 * @property boolean display
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getUserId
 * @property int getIndex
 * @property string getContent
 * @property string getAnswer
 * @property string|null getCategory
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property BelongsTo user
 * @property Builder scopeGetById
 * @property Builder scopeGetByUserId
 * @property Builder scopeGetByIndex
 * @property Builder scopeGetByContent
 * @property Builder scopeGetByAnswer
 * @property Builder scopeGetByCategory
 * @property Builder scopeGetByOnSite
 * @property Builder scopeGetByDisplay
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */

class Question extends Model implements QuestionContract
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'index',
        'content',
        'answer',
        'category',
        'on_site',
        'display'
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
    public function getIndex(): int
    {
        return $this->index;
    }
    public function getContent(): string
    {
        return $this->content;
    }
    public function getAnswer(): string
    {
        return $this->answer;
    }
    public function getCategory(): string|null
    {
        return $this->category;
    }
    public function getOnSite(): bool
    {
        return in_array($this->category, ['home', 'about', 'services']);
    }
    public function getDisplay(): bool
    {
        return $this->display;
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
    public function scopeGetByIndex(Builder $query, int $index): Builder
    {
        return $query->where('index', $index);
    }
    public function scopeGetByContent(Builder $query, string $content): Builder
    {
        return $query->where('content', $content);
    }
    public function scopeGetByAnswer(Builder $query, string $answer): Builder
    {
        return $query->where('answer', $answer);
    }
    public function scopeGetByCategory(Builder $query, ?string $category): Builder
    {
        return $query->where('category', $category);
    }
    public function scopeGetByOnSite(Builder $query, bool $on_site): Builder
    {
        return $query->where('on_site', $on_site);
    }
    public function scopeGetByDisplay(Builder $query, bool $display): Builder
    {
        return $query->where('display', $display);
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
