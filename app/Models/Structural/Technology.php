<?php

namespace App\Models\Structural;

use App\Contracts\Structural\TechnologyContract;
use App\Models\Entities\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int user_id
 * @property string href
 * @property string src
 * @property string label
 * @property string description
 * @property string|null category
 * @property boolean display
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getUserId
 * @property int getHref
 * @property int getSrc
 * @property string getLabel
 * @property string getDescription
 * @property string|null getCategory
 * @property string getDisplay
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property BelongsTo user
 * @property Builder scopeGetById
 * @property Builder scopeGetByUserId
 * @property Builder scopeGetByHref
 * @property Builder scopeGetBySrc
 * @property Builder scopeGetByLabel
 * @property Builder scopeGetByDescription
 * @property Builder scopeGetByCategory
 * @property Builder scopeGetByDisplay
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */

class Technology extends Model implements TechnologyContract
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'href',
        'src',
        'label',
        'description',
        'display',
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
    public function getHref(): string
    {
        return $this->href;
    }
    public function getSrc(): string
    {
        return $this->src;
    }
    public function getLabel(): string
    {
        return $this->label;
    }
    public function getDescription(): string
    {
        return $this->description;
    }
    public function getCategory(): string|null
    {
        return $this->category;
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
    public function scopeGetById(Builder $query, int $parameter): Builder
    {
        return $query->where('id', $parameter);
    }
    public function scopeGetByUserId(Builder $query, int $parameter): Builder
    {
        return $query->where('user_id', $parameter);
    }
    public function scopeGetByHref(Builder $query, string $parameter): Builder
    {
        return $query->where('href', $parameter);
    }
    public function scopeGetBySrc(Builder $query, string $parameter): Builder
    {
        return $query->where('src', $parameter);
    }
    public function scopeGetByLabel(Builder $query, string $parameter): Builder
    {
        return $query->where('label', $parameter);
    }
    public function scopeGetByDescription(Builder $query, string $parameter): Builder
    {
        return $query->where('description', $parameter);
    }
    public function scopeGetByCategory(Builder $query, ?string $parameter): Builder
    {
        return $query->where('category', $parameter);
    }
    public function scopeGetByDisplay(Builder $query, bool $parameter): Builder
    {
        return $query->where('display', $parameter);
    }
    public function scopeGetByCreatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('created_at', $parameter);
    }
    public function scopeGetByUpdatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('updated_at', $parameter);
    }

    /**
     *  Relational functions
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
