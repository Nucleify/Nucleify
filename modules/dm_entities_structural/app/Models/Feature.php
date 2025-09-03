<?php

namespace App\Models;

use App\Contracts\FeatureContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string icon
 * @property string header
 * @property string description
 * @property string category
 * @property int getId()
 * @property string getIcon()
 * @property string getHeader()
 * @property string getDescription()
 * @property string getCategory()
 * @property string getCreatedAt()
 * @property string getUpdatedAt()
 * @property Builder scopeGetById()
 * @property Builder scopeGetByIcon()
 * @property Builder scopeGetByHeader()
 * @property Builder scopeGetByDescription()
 * @property Builder scopeGetByCategory()
 * @property Builder scopeGetByCreatedAt()
 * @property Builder scopeGetByUpdatedAt()
 */
class Feature extends Model implements FeatureContract
{
    use HasFactory;

    protected $fillable = [
        'icon',
        'header',
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

    public function getIcon(): string
    {
        return $this->icon;
    }

    public function getHeader(): string
    {
        return $this->header;
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
    public function scopeGetById(Builder $query, int $parameter): Builder
    {
        return $query->where('id', $parameter);
    }

    public function scopeGetByIcon(Builder $query, string $parameter): Builder
    {
        return $query->where('icon', $parameter);
    }

    public function scopeGetByHeader(Builder $query, string $parameter): Builder
    {
        return $query->where('header', $parameter);
    }

    public function scopeGetByDescription(Builder $query, string $parameter): Builder
    {
        return $query->where('description', $parameter);
    }

    public function scopeGetByCategory(Builder $query, string $parameter): Builder
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
}
