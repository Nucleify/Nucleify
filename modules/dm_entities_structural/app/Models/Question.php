<?php

namespace App\Models;

use App\Contracts\QuestionContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property int index
 * @property string content
 * @property string answer
 * @property string|null category
 * @property bool on_site
 * @property bool display
 * @property string created_at
 * @property string updated_at
 * @property int getId()
 * @property int getIndex()
 * @property string getContent()
 * @property string getAnswer()
 * @property string|null getCategory()
 * @property bool getDisplay()
 * @property bool getOnSite()
 * @property string getCreatedAt()
 * @property string getUpdatedAt()
 * @property Builder scopeGetById()
 * @property Builder scopeGetByIndex()
 * @property Builder scopeGetByContent()
 * @property Builder scopeGetByAnswer()
 * @property Builder scopeGetByCategory()
 * @property Builder scopeGetByOnSite()
 * @property Builder scopeGetByDisplay()
 * @property Builder scopeGetByCreatedAt()
 * @property Builder scopeGetByUpdatedAt()
 */
class Question extends Model implements QuestionContract
{
    use HasFactory;

    protected $fillable = [
        'index',
        'content',
        'answer',
        'category',
        'on_site',
        'display',
    ];

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }

    public function getIndex(): int
    {
        return $this->index;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function getAnswer(): string
    {
        return $this->answer;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function getOnSite(): bool
    {
        return in_array($this->category, ['home', 'about', 'services']);
    }

    public function getDisplay(): bool
    {
        return $this->display;
    }

    public function getCreatedAt(): string
    {
        return $this->created_at;
    }

    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    /**
     *  Scope methods
     */
    public function scopeGetById(Builder $query, int $parameter): Builder
    {
        return $query->where('id', $parameter);
    }

    public function scopeGetByIndex(Builder $query, int $parameter): Builder
    {
        return $query->where('index', $parameter);
    }

    public function scopeGetByContent(Builder $query, string $parameter): Builder
    {
        return $query->where('content', $parameter);
    }

    public function scopeGetByAnswer(Builder $query, string $parameter): Builder
    {
        return $query->where('answer', $parameter);
    }

    public function scopeGetByCategory(Builder $query, string $parameter): Builder
    {
        return $query->where('category', $parameter);
    }

    public function scopeGetByOnSite(Builder $query, bool $parameter): Builder
    {
        return $query->where('on_site', $parameter);
    }

    public function scopeGetByDisplay(Builder $query, bool $parameter): Builder
    {
        return $query->where('display', $parameter);
    }

    public function scopeGetByCreatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('created_at', $parameter);
    }

    public function scopeGetByUpdatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('updated_at', $parameter);
    }
}
