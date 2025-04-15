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
 * @property int getId
 * @property string getSrc
 * @property string getTitle
 * @property string getDescription
 * @property string|null getCategory
 * @property string getComponent
 * @property bool getDisplay
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property Builder scopeGetById
 * @property Builder scopeGetBySrc
 * @property Builder scopeGetByTitle
 * @property Builder scopeGetByDescription
 * @property Builder scopeGetByCategory
 * @property Builder scopeGetByComponent
 * @property Builder scopeGetByDisplay
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
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
    public function scopeGetById(Builder $query, int $id): Builder
    {
        return $query->where('id', $id);
    }

    public function scopeGetBySrc(Builder $query, string $src): Builder
    {
        return $query->where('src', $src);
    }

    public function scopeGetByTitle(Builder $query, string $title): Builder
    {
        return $query->where('title', $title);
    }

    public function scopeGetByDescription(Builder $query, string $description): Builder
    {
        return $query->where('description', $description);
    }

    public function scopeGetByCategory(Builder $query, ?string $parameter): Builder
    {
        return $query->where('category', $parameter);
    }

    public function scopeGetByComponent(Builder $query, string $component): Builder
    {
        return $query->where('component', $component);
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
}
