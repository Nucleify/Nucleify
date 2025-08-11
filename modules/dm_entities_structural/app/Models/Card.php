<?php

namespace App\Models;

use App\Contracts\CardContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string src
 * @property string title
 * @property string description
 * @property string|null category
 * @property string component
 * @property bool display
 * @property string created_at
 * @property string updated_at
 * @property int getId()
 * @property string getSrc()
 * @property string getTitle()
 * @property string getDescription()
 * @property string|null getCategory()
 * @property string getComponent()
 * @property bool getDisplay()
 * @property string getCreatedAt()
 * @property string getUpdatedAt()
 * @property Builder scopeGetById()
 * @property Builder scopeGetBySrc()
 * @property Builder scopeGetByTitle()
 * @property Builder scopeGetByDescription()
 * @property Builder scopeGetByCategory()
 * @property Builder scopeGetByComponent()
 * @property Builder scopeGetByDisplay()
 * @property Builder scopeGetByCreatedAt()
 * @property Builder scopeGetByUpdatedAt()
 */
class Card extends Model implements CardContract
{
    use HasFactory;

    protected $fillable = [
        'src',
        'title',
        'description',
        'component',
        'display',
    ];

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }

    public function getSrc(): string
    {
        return $this->src;
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

    public function getComponent(): string
    {
        return $this->component;
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

    public function scopeGetBySrc(Builder $query, string $parameter): Builder
    {
        return $query->where('src', $parameter);
    }

    public function scopeGetByTitle(Builder $query, string $parameter): Builder
    {
        return $query->where('title', $parameter);
    }

    public function scopeGetByDescription(Builder $query, string $parameter): Builder
    {
        return $query->where('description', $parameter);
    }

    public function scopeGetByCategory(Builder $query, string $parameter): Builder
    {
        return $query->where('category', $parameter);
    }

    public function scopeGetByComponent(Builder $query, string $parameter): Builder
    {
        return $query->where('component', $parameter);
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
