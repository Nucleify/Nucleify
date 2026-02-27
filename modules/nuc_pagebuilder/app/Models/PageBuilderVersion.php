<?php

namespace App\Models;

use App\Contracts\PageBuilderVersionContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageBuilderVersion extends Model implements PageBuilderVersionContract
{
    use HasFactory;

    protected $table = 'page_builder_versions';

    protected $fillable = [
        'page_id',
        'version',
        'layout_json',
        'checksum',
        'is_published',
        'created_by',
    ];

    protected $casts = [
        'layout_json' => 'array',
        'is_published' => 'boolean',
    ];

    public function getId(): int
    {
        return $this->id;
    }

    public function getPageId(): int
    {
        return $this->page_id;
    }

    public function getVersion(): int
    {
        return $this->version;
    }

    public function getLayoutJson(): array
    {
        return $this->layout_json;
    }

    public function getChecksum(): string
    {
        return $this->checksum;
    }

    public function getIsPublished(): bool
    {
        return $this->is_published;
    }

    public function getCreatedBy(): int
    {
        return $this->created_by;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(PageBuilderPage::class, 'page_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
