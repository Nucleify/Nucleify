<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int id
 * @property int count
 * @property int sender_id
 * @property int receiver_id
 * @property DateTime created_at
 * @property DateTime updated_at
 * @property int getId
 * @property int getCount
 * @property int getSenderId
 * @property int getReceiverId
 * @property DateTime getCreatedAt
 * @property DateTime getUpdatedAt
 * @property BelongsTo sender
 * @property BelongsTo receiver
 */
class Money extends Model
{
    use HasFactory;

    protected $fillable = [
        'count',
        'sender_id',
        'receiver_id',
    ];

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }

    public function getCount(): int
    {
        return $this->count;
    }
    public function getSenderId(): int
    {
        return $this->sender_id;
    }
    public function getReceiverId(): int
    {
        return $this->receiver_id;
    }
    public function getCreatedAt(): DateTime
    {
        return $this->created_at;
    }
    public function getUpdatedAt(): DateTime
    {
        return $this->updated_at;
    }

    /**
     *  Relational functions
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}

