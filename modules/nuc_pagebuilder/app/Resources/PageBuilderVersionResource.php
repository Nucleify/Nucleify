<?php

namespace App\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageBuilderVersionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getId(),
            'page_id' => $this->getPageId(),
            'version' => $this->getVersion(),
            'layout_json' => $this->getLayoutJson(),
            'checksum' => $this->getChecksum(),
            'is_published' => $this->getIsPublished(),
            'created_by' => $this->getCreatedBy(),
            'created_at' => $this->getCreatedAt(),
            'updated_at' => $this->getUpdatedAt(),
        ];
    }
}
