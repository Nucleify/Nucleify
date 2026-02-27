<?php

namespace App\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageBuilderPageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getId(),
            'user_id' => $this->getUserId(),
            'title' => $this->getTitle(),
            'slug' => $this->getSlug(),
            'status' => $this->getStatus(),
            'meta_json' => $this->getMetaJson(),
            'published_version_id' => $this->getPublishedVersionId(),
            'published_version' => $this->whenLoaded(
                'publishedVersion',
                fn () => new PageBuilderVersionResource($this->publishedVersion)
            ),
            'versions' => $this->whenLoaded(
                'versions',
                fn () => PageBuilderVersionResource::collection($this->versions)
            ),
            'created_at' => $this->getCreatedAt(),
            'updated_at' => $this->getUpdatedAt(),
        ];
    }
}
