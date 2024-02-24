<?php

namespace App\Models;

use App\Contracts\ContactShouldReceiveFields;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

/**
 *  Fix error: Property accessed via magic method
 *
 * @property integer id
 * @property integer user_id
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
 */
class Contact extends Model implements ContactShouldReceiveFields
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

    public function getId(): int
    {
        return $this->id;
    }
    public function getUserId(): int
    {
        return $this->user_id;
    }
//    public function getFirstName(): string
//    {
//        return $this->first_name;
//    }
//    public function getLastName(): string|null
//    {
//        return $this->last_name;
//    }
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
    public function getContactGroups(): array|null
    {
        return $this->contact_groups;
    }

    // AUTH METHODS
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
    public function isStaff(): bool
    {
        return $this->role === 'staff';
    }
}
