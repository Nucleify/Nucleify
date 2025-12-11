<?php

namespace App\Models;

use App\Contracts\FileContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int user_id
 * @property string path
 * @property string mime_type
 * @property string size
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getUserId
 * @property string getPath
 * @property string getMimeType
 * @property string getSize
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property Builder scopeGetById
 * @property Builder scopeGetByUserId
 * @property Builder scopeGetByPath
 * @property Builder scopeGetByMimeType
 * @property Builder scopeGetBySize
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 * @property BelongsTo user
 */
class File extends Model implements FileContract
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'path',
        'mime_type',
        'size',
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

    public function getPath(): string
    {
        return $this->path;
    }

    public function getMimeType(): string
    {
        return $this->mime_type;
    }

    public function getSize(): string
    {
        return $this->size;
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
    public function scopeGetById(Builder $query, string $parameter): Builder
    {
        return $query->where('id', $parameter);
    }

    public function scopeGetByUserId(Builder $query, string $parameter): Builder
    {
        return $query->where('user_id', $parameter);
    }

    public function scopeGetByPath(Builder $query, string $parameter): Builder
    {
        return $query->where('path', $parameter);
    }

    public function scopeGetByMimeType(Builder $query, string $parameter): Builder
    {
        return $query->where('mime_type', $parameter);
    }

    public function scopeGetBySize(Builder $query, string $parameter): Builder
    {
        return $query->where('size', $parameter);
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
        return $this->belongsTo(User::class);
    }
}
