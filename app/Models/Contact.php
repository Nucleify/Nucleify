<?php

namespace App\Models;

use App\Contracts\ContactContract;
use DateTime;
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
 * @property DateTime created_at
 * @property DateTime updated_at
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
        'role'
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
    public function getLastName(): string|null
    {
        return $this->last_name;
    }
    public function getFullName(): string|null
    {
        return $this->first_name . ' ' . $this->last_name;
    }
    public function getEmail(): string|null
    {
        return $this->email;
    }
    public function getPersonalPhone(): string|null
    {
        return $this->personal_phone;
    }
    public function getWorkPhone(): string|null
    {
        return $this->work_phone;
    }
    public function getAddress(): string|null
    {
        return $this->address;
    }
    public function getBirthday(): string|null
    {
        return $this->birthday;
    }
    public function getRole(): string|null
    {
        return $this->role;
    }
    public function getContactGroups(): string|null
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
    public function scopeGetByUserId(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }
    public function scopeGetByFirstName(Builder $query, string $firstName): Builder
    {
        return $query->where('first_name', $firstName);
    }
    public function scopeGetByLastName(Builder $query, ?string $lastName): Builder
    {
        return $query->where('last_name', $lastName);
    }
    public function scopeGetByEmail(Builder $query, ?string $email): Builder
    {
        return $query->where('email', $email);
    }
    public function scopeGetByPersonalPhone(Builder $query, ?string $personalPhone): Builder
    {
        return $query->where('personal_phone', $personalPhone);
    }
    public function scopeGetByWorkPhone(Builder $query, ?string $workPhone): Builder
    {
        return $query->where('work_phone', $workPhone);
    }
    public function scopeGetByAddress(Builder $query, ?string $address): Builder
    {
        return $query->where('address', $address);
    }
    public function scopeGetByBirthday(Builder $query, ?string $birthday): Builder
    {
        return $query->where('birthday', $birthday);
    }
    public function scopeGetByRole(Builder $query, ?string $role): Builder
    {
        return $query->where('role', $role);
    }
    public function scopeGetByCreatedAt(Builder $query, string $createdAt): Builder
    {
        return $query->whereDate('created_at', $createdAt);
    }
    public function scopeGetByUpdatedAt(Builder $query, string $updatedAt): Builder
    {
        return $query->whereDate('updated_at', $updatedAt);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
