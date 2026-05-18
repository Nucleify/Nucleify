<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShareRequest extends Model
{
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'entity_type',
        'entity_ids',
        'status',
    ];

    protected $casts = [
        'entity_ids' => 'array',
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeForReceiver($query, int $userId)
    {
        return $query->where('receiver_id', $userId);
    }

    public function scopeForSender($query, int $userId)
    {
        return $query->where('sender_id', $userId);
    }
}
