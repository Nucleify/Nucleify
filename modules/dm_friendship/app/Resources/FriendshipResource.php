<?php

namespace App\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FriendshipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $authUserId = auth()->id();
        $isSender = $this->sender_id === $authUserId;

        $friend = $isSender ? $this->recipient : $this->sender;

        return [
            'id' => $this->id,
            'friend' => [
                'id' => $friend->id,
                'name' => $friend->name,
                'email' => $friend->email,
                'role' => $friend->role,
            ],
            'status' => $this->status,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
