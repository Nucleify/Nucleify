<?php

namespace App\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
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
            'index' => $this->getIndex(),
            'content' => $this->getContent(),
            'answer' => $this->getAnswer(),
            'category' => $this->getCategory(),
            'on_site' => $this->getOnSite(),
            'display' => $this->getDisplay(),
            'created_at' => $this->getCreatedAt(),
            'updated_at' => $this->getUpdatedAt(),
        ];
    }
}
