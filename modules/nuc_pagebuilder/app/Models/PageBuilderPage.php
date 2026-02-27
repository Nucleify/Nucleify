<?php

namespace App\Models;

use App\Contracts\PageBuilderPageContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PageBuilderPage extends Model implements PageBuilderPageContract
{
    use HasFactory;

    protected $table = 'page_builder_pages';

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'status',
        'meta_json',
        'published_version_id',
    ];

    protected $casts = [
        'meta_json' => 'array',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getMetaJson(): ?array
    {
        return $this->meta_json;
    }

    public function getPublishedVersionId(): ?int
    {
        return $this->published_version_id;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function versions(): HasMany
    {
        return $this->hasMany(PageBuilderVersion::class, 'page_id');
    }

    public function publishedVersion(): BelongsTo
    {
        return $this->belongsTo(PageBuilderVersion::class, 'published_version_id');
    }
}
