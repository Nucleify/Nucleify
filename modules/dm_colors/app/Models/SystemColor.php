<?php

namespace App\Models;

use App\Contracts\SystemColorContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string name
 * @property string value
 * @property bool new
 * @property string created_at
 * @property string updated_at
 * @property int getId()
 * @property string getName()
 * @property string getValue()
 * @property bool getNew()
 * @property string getCreatedAt()
 * @property string getUpdatedAt()
 * @property Builder scopeGetById()
 * @property Builder scopeGetByName()
 * @property Builder scopeGetByValue()
 * @property Builder scopeGetByNew()
 * @property Builder scopeGetByCreatedAt()
 * @property Builder scopeGetByUpdatedAt()
 */
class SystemColor extends Model implements SystemColorContract
{
    use HasFactory;

    protected $fillable = [
        'name',
        'value',
        'new',
    ];

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getValue(): string
    {
        return $this->value;
    }

    public function getNew(): bool
    {
        return $this->new;
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

    public function scopeGetByName(Builder $query, string $parameter): Builder
    {
        return $query->where('name', $parameter);
    }

    public function scopeGetByValue(Builder $query, string $parameter): Builder
    {
        return $query->where('value', $parameter);
    }

    public function scopeGetByNew(Builder $query, bool $parameter): Builder
    {
        return $query->where('new', $parameter);
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
