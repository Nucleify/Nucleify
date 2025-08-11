<?php

namespace App\Models;

use App\Contracts\LinkContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string|null download
 * @property string href
 * @property string|null src
 * @property string|null icon
 * @property string category
 * @property string|null hreflang
 * @property string|null media
 * @property string|null ping
 * @property string|null referrerpolicy
 * @property string|null rel
 * @property string|null target
 * @property string|null type
 * @property string created_at
 * @property string updated_at
 * @property int getId()
 * @property string|null getDownload()
 * @property string getHref()
 * @property string|null getSrc()
 * @property string|null getIcon()
 * @property string getCategory()
 * @property string|null getHreflang()
 * @property string|null getMedia()
 * @property string|null getPing()
 * @property string|null getReferrerPolicy()
 * @property string|null getRel()
 * @property string|null getTarget()
 * @property string|null getType()
 * @property string getCreatedAt()
 * @property string getUpdatedAt()
 * @property Builder scopeGetById()
 * @property Builder scopeGetByDownload()
 * @property Builder scopeGetByHref()
 * @property Builder scopeGetBySrc()
 * @property Builder scopeGetByIcon()
 * @property Builder scopeGetByCategory()
 * @property Builder scopeGetByHreflang()
 * @property Builder scopeGetByMedia()
 * @property Builder scopeGetByPing()
 * @property Builder scopeGetByReferrerPolicy()
 * @property Builder scopeGetByRel()
 * @property Builder scopeGetByTarget()
 * @property Builder scopeGetByType()
 * @property Builder scopeGetByCreatedAt()
 * @property Builder scopeGetByUpdatedAt()
 */
class Link extends Model implements LinkContract
{
    use HasFactory;

    protected $fillable = [
        'download',
        'href',
        'src',
        'icon',
        'category',
        'hreflang',
        'media',
        'ping',
        'referrerpolicy',
        'rel',
        'target',
        'type',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getDownload(): ?string
    {
        return $this->download;
    }

    public function getHref(): string
    {
        return $this->href;
    }

    public function getSrc(): ?string
    {
        return $this->src;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function getCategory(): string
    {
        return $this->category;
    }

    public function getHreflang(): ?string
    {
        return $this->hreflang;
    }

    public function getMedia(): ?string
    {
        return $this->media;
    }

    public function getPing(): ?string
    {
        return $this->ping;
    }

    public function getReferrerPolicy(): ?string
    {
        return $this->referrerpolicy;
    }

    public function getRel(): ?string
    {
        return $this->rel;
    }

    public function getTarget(): ?string
    {
        return $this->target;
    }

    public function getType(): ?string
    {
        return $this->type;
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
     * Scope methods
     */
    public function scopeGetById(Builder $query, int $parameter): Builder
    {
        return $query->where('id', $parameter);
    }

    public function scopeGetByDownload(Builder $query, string $parameter): Builder
    {
        return $query->where('download', $parameter);
    }

    public function scopeGetByHref(Builder $query, string $parameter): Builder
    {
        return $query->where('href', $parameter);
    }

    public function scopeGetBySrc(Builder $query, string $parameter): Builder
    {
        return $query->where('src', $parameter);
    }

    public function scopeGetByIcon(Builder $query, string $parameter): Builder
    {
        return $query->where('icon', $parameter);
    }

    public function scopeGetByCategory(Builder $query, string $parameter): Builder
    {
        return $query->where('category', $parameter);
    }

    public function scopeGetByHreflang(Builder $query, string $parameter): Builder
    {
        return $query->where('hreflang', $parameter);
    }

    public function scopeGetByMedia(Builder $query, string $parameter): Builder
    {
        return $query->where('media', $parameter);
    }

    public function scopeGetByPing(Builder $query, string $parameter): Builder
    {
        return $query->where('ping', $parameter);
    }

    public function scopeGetByReferrerPolicy(Builder $query, string $parameter): Builder
    {
        return $query->where('referrerpolicy', $parameter);
    }

    public function scopeGetByRel(Builder $query, string $parameter): Builder
    {
        return $query->where('rel', $parameter);
    }

    public function scopeGetByTarget(Builder $query, string $parameter): Builder
    {
        return $query->where('target', $parameter);
    }

    public function scopeGetByType(Builder $query, string $parameter): Builder
    {
        return $query->where('type', $parameter);
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
