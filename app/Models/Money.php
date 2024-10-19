<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int count
 * @property string sender
 * @property string receiver
 * @property string sender_id
 * @property string receiver_id
 * @property DateTime created_at
 * @property DateTime updated_at
 */
class Money extends Model
{
    use HasFactory;

    protected $fillable = [
        'count',
        'sender',
        'receiver',
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

    public function getSender(): string
    {
        return $this->sender;
    }

    public function getReceiver(): string
    {
        return $this->receiver;
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
}

