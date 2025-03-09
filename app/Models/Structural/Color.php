<?php

namespace App\Models\Structural;

use App\Contracts\Structural\ColorContract;
use App\Models\Entities\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * @property int id
 * @property int user_id
 * @property string entity
 * @property string value
 * @property boolean new
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getUserId
 * @property int getEntity
 * @property string getValue
 * @property string getNew
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property BelongsTo user
 * @property Builder scopeGetById
 * @property Builder scopeGetByUserId
 * @property Builder scopeGetByEntity
 * @property Builder scopeGetByValue
 * @property Builder scopeGetByNew
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */

class Color extends Model implements ColorContract
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'entity',
        'value',
        'new'
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
    public function getEntity(): string
    {
        return $this->entity;
    }
    public function getValue(): string
    {
        return $this->value;
    }
    public function getNew(): bool
    {
        return $this->new;
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
    public function scopeGetByEntity(Builder $query, string $parameter): Builder
    {
        return $query->where('entity', $parameter);
    }
    public function scopeGetByValue(Builder $query, string $parameter): Builder
    {
        return $query->where('value', $parameter);
    }
    public function scopeGetByNew(Builder $query, bool $parameter): Builder
    {
        return $query->where('new', $parameter);
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
