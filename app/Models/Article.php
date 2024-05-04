<?php

namespace App\Models;

use App\Contracts\ArticleShouldReceiveFields;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int user_id
 * @property string title
 * @property string description
 * @property string|null category
 * @property DateTime created_at
 * @property DateTime updated_at
 * @property string getTitle
 * @property string getDescription
 * @property string|null getCategory
 * @property string getCreatedAt
 * @property string getUpdatedAt
 */
class Article extends Model implements ArticleShouldReceiveFields
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'category',
    ];

    public function getId(): int
    {
        return $this->id;
    }
    public function getTitle(): string
    {
        return $this->title;
    }
    public function getDescription(): string
    {
        return $this->description;
    }
    public function getCategory(): string
    {
        return $this->category;
    }
    public function getCreatedAt(): string
    {
        return $this->created_at;
    }
    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }
}
