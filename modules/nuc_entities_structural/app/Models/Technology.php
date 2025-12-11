<?php

namespace App\Models;

use App\Contracts\TechnologyContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string label
 * @property string|null description
 * @property string href
 * @property string src
 * @property string|null category
 * @property bool display
 * @property string created_at
 * @property string updated_at
 * @property int getId()
 * @property string getLabel()
 * @property string|null getDescription()
 * @property int getHref()
 * @property int getSrc()
 * @property string|null getCategory()
 * @property string getDisplay()
 * @property string getCreatedAt()
 * @property string getUpdatedAt()
 * @property Builder scopeGetById()
 * @property Builder scopeGetByLabel()
 * @property Builder scopeGetByDescription()
 * @property Builder scopeGetByHref()
 * @property Builder scopeGetBySrc()
 * @property Builder scopeGetByCategory()
 * @property Builder scopeGetByDisplay()
 * @property Builder scopeGetByCreatedAt()
 * @property Builder scopeGetByUpdatedAt()
 */
class Technology extends Model implements TechnologyContract
{
    use HasFactory;

    protected $fillable = [
        'label',
        'description',
        'href',
        'src',
        'display',
        'category',
    ];

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getHref(): string
    {
        return $this->href;
    }

    public function getSrc(): string
    {
        return $this->src;
    }

    public function getCategory(): ?string
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

    public function scopeGetByLabel(Builder $query, string $parameter): Builder
    {
        return $query->where('label', $parameter);
    }

    public function scopeGetByDescription(Builder $query, string $parameter): Builder
    {
        return $query->where('description', $parameter);
    }

    public function scopeGetByHref(Builder $query, string $parameter): Builder
    {
        return $query->where('href', $parameter);
    }

    public function scopeGetBySrc(Builder $query, string $parameter): Builder
    {
        return $query->where('src', $parameter);
    }

    public function scopeGetByCategory(Builder $query, string $parameter): Builder
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
}
