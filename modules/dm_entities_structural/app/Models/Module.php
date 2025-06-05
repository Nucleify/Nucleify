<?php

namespace App\Models;

use App\Contracts\ModuleContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string name
 * @property string description
 * @property string category
 * @property string version
 * @property bool enabled
 * @property string created_at
 * @property string updated_at
 * @property Builder scopeGetById
 * @property Builder scopeGetByName
 * @property Builder scopeGetByDescription
 * @property Builder scopeGetByCategory
 * @property Builder scopeGetByVersion
 * @property Builder scopeGetByEnabled
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */
class Module extends Model implements ModuleContract
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'version',
        'enabled',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getCategory(): string
    {
        return $this->category;
    }

    public function getVersion(): string
    {
        return $this->version;
    }

    public function getEnabled(): bool
    {
        return $this->enabled;
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
    public function scopeGetById(Builder $query, string $id): Builder
    {
        return $query->where('id', $id);
    }

    public function scopeGetByName(Builder $query, string $name): Builder
    {
        return $query->where('name', $name);
    }

    public function scopeGetByDescription(Builder $query, string $description): Builder
    {
        return $query->where('description', $description);
    }

    public function scopeGetByCategory(Builder $query, string $category): Builder
    {
        return $query->where('category', $category);
    }

    public function scopeGetByVersion(Builder $query, string $version): Builder
    {
        return $query->where('version', $version);
    }

    public function scopeGetByEnabled(Builder $query, bool $enabled): Builder
    {
        return $query->where('enabled', $enabled);
    }

    public function scopeGetByCreatedAt(Builder $query, string $createdAt): Builder
    {
        return $query->where('created_at', $createdAt);
    }

    public function scopeGetByUpdatedAt(Builder $query, string $updatedAt): Builder
    {
        return $query->where('updated_at', $updatedAt);
    }
}
