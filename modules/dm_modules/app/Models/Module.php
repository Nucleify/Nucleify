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
 * @property bool installed
 * @property string created_at
 * @property string updated_at
 * @property string getId()
 * @property string getName()
 * @property string getDescription()
 * @property string getCategory()
 * @property string getVersion()
 * @property bool getEnabled()
 * @property bool getInstalled()
 * @property string getCreatedAt()
 * @property string getUpdatedAt()
 * @property Builder scopeGetById()
 * @property Builder scopeGetByName()
 * @property Builder scopeGetByDescription()
 * @property Builder scopeGetByCategory()
 * @property Builder scopeGetByVersion()
 * @property Builder scopeGetByEnabled()
 * @property Builder scopeGetByInstalled()
 * @property Builder scopeGetByCreatedAt()
 * @property Builder scopeGetByUpdatedAt()
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
        'installed',
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

    public function getInstalled(): bool
    {
        return $this->installed;
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

    public function scopeGetByName(Builder $query, string $parameter): Builder
    {
        return $query->where('name', $parameter);
    }

    public function scopeGetByDescription(Builder $query, string $parameter): Builder
    {
        return $query->where('description', $parameter);
    }

    public function scopeGetByCategory(Builder $query, string $parameter): Builder
    {
        return $query->where('category', $parameter);
    }

    public function scopeGetByVersion(Builder $query, string $parameter): Builder
    {
        return $query->where('version', $parameter);
    }

    public function scopeGetByEnabled(Builder $query, bool $parameter): Builder
    {
        return $query->where('enabled', $parameter);
    }

    public function scopeGetByInstalled(Builder $query, bool $parameter): Builder
    {
        return $query->where('installed', $parameter);
    }

    public function scopeGetByCreatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('created_at', $parameter);
    }

    public function scopeGetByUpdatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('updated_at', $parameter);
    }
}
