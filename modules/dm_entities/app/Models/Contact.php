<?php

namespace App\Models;

use App\Contracts\ContactContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

/**
 * @property int id
 * @property int user_id
 * @property string first_name
 * @property string|null last_name
 * @property string|null email
 * @property string|null personal_phone
 * @property string|null work_phone
 * @property string|null address
 * @property string|null birthday
 * @property mixed|null contact_groups
 * @property string|null role
 * @property string created_at
 * @property string updated_at
 * @property int getId
 * @property int getUserId
 * @property string getFirstName
 * @property string|null getLastName
 * @property string|null getFullName
 * @property string|null getEmail
 * @property string|null getRole
 * @property string|null getPersonalPhone
 * @property string|null getWorkPhone
 * @property string|null getAddress
 * @property string|null getBirthday
 * @property array|null getContactGroups
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property BelongsTo user
 * @property Builder scopeGetById
 * @property Builder scopeGetByUserId
 * @property Builder scopeGetByFirstName
 * @property Builder scopeGetByLastName
 * @property Builder scopeGetByEmail
 * @property Builder scopeGetByPersonalPhone
 * @property Builder scopeGetByWorkPhone
 * @property Builder scopeGetByAddress
 * @property Builder scopeGetByBirthday
 * @property Builder scopeGetByRole
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 */
class Contact extends Model implements ContactContract
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'personal_phone',
        'work_phone',
        'address',
        'birthday',
        'contact_groups',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     *  Instance methods
     */
    public function getId(): int
    {
        return $this->id;
    }

    public function getUserId(): int
    {
        return $this->user_id;
    }

    public function getFirstName(): string
    {
        return $this->first_name;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function getFullName(): ?string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function getPersonalPhone(): ?string
    {
        return $this->personal_phone;
    }

    public function getWorkPhone(): ?string
    {
        return $this->work_phone;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function getBirthday(): ?string
    {
        return $this->birthday;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function getContactGroups(): ?string
    {
        return $this->contact_groups;
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

    public function scopeGetByUserId(Builder $query, int $parameter): Builder
    {
        return $query->where('user_id', $parameter);
    }

    public function scopeGetByFirstName(Builder $query, string $parameter): Builder
    {
        return $query->where('first_name', $parameter);
    }

    public function scopeGetByLastName(Builder $query, ?string $parameter): Builder
    {
        return $query->where('last_name', $parameter);
    }

    public function scopeGetByEmail(Builder $query, ?string $parameter): Builder
    {
        return $query->where('email', $parameter);
    }

    public function scopeGetByPersonalPhone(Builder $query, ?string $parameter): Builder
    {
        return $query->where('personal_phone', $parameter);
    }

    public function scopeGetByWorkPhone(Builder $query, ?string $parameter): Builder
    {
        return $query->where('work_phone', $parameter);
    }

    public function scopeGetByAddress(Builder $query, ?string $parameter): Builder
    {
        return $query->where('address', $parameter);
    }

    public function scopeGetByBirthday(Builder $query, ?string $parameter): Builder
    {
        return $query->where('birthday', $parameter);
    }

    public function scopeGetByRole(Builder $query, ?string $parameter): Builder
    {
        return $query->where('role', $parameter);
    }

    public function scopeGetByCreatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('created_at', $parameter);
    }

    public function scopeGetByUpdatedAt(Builder $query, string $parameter): Builder
    {
        return $query->whereDate('updated_at', $parameter);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
