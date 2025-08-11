<?php

namespace App\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LinkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getId(),
            'download' => $this->getDownload(),
            'href' => $this->getHref(),
            'src' => $this->getSrc(),
            'icon' => $this->getIcon(),
            'category' => $this->getCategory(),
            'hreflang' => $this->getHreflang(),
            'media' => $this->getMedia(),
            'ping' => $this->getPing(),
            'referrerpolicy' => $this->getReferrerPolicy(),
            'rel' => $this->getRel(),
            'target' => $this->getTarget(),
            'type' => $this->getType(),
            'created_at' => $this->getCreatedAt(),
            'updated_at' => $this->getUpdatedAt(),
        ];
    }
}
