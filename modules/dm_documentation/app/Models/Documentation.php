<?php

namespace App\Models;

use App\Contracts\DocumentationContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string name
 * @property string|null category
 * @property string|null version
 * @property string file
 * @property string created_at
 * @property string updated_at
 * @property int getId()
 * @property string getName()
 * @property string|null getCategory()
 * @property string|null getVersion()
 * @property string getFile()
 * @property string getCreatedAt()
 * @property string getUpdatedAt()
 * @property Builder scopeGetById()
 * @property Builder scopeGetByName()
 * @property Builder scopeGetByCategory()
 * @property Builder scopeGetByVersion()
 * @property Builder scopeGetByFile()
 */
class Documentation extends Model implements DocumentationContract
{
    use HasFactory;

    protected $table = 'documentation';

    protected $fillable = [
        'name',
        'category',
        'version',
        'file',
    ];

    /**
     * Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function getVersion(): ?string
    {
        return $this->version;
    }

    public function getFile(): string
    {
        return $this->file;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at->toDateTimeString();
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at->toDateTimeString();
    }

    /**
     * Scope methods
     */
    public function scopeGetById(Builder $query, int $parameter): Builder
    {
        return $query->where('id', $parameter);
    }

    public function scopeGetByName(Builder $query, string $parameter): Builder
    {
        return $query->where('name', $parameter);
    }

    public function scopeGetByCategory(Builder $query, string $parameter): Builder
    {
        return $query->where('category', $parameter);
    }

    public function scopeGetByVersion(Builder $query, string $parameter): Builder
    {
        return $query->where('version', $parameter);
    }

    public function scopeGetByFile(Builder $query, string $parameter): Builder
    {
        return $query->where('file', $parameter);
    }
}
