<?php

namespace App\Models;

use App\Contracts\UserShouldReceiveFields;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Fix error: Property accessed via magic method
 *
 * @property integer id
 * @property string name
 * @property string email
 * @property string password
 * @property string role
 * @property DateTime created_at
 * @property DateTime updated_at
 */

class User extends Authenticatable implements UserShouldReceiveFields
{
    use HasApiTokens, HasFactory, Notifiable;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
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
    public function getName(): string
    {
        return $this->name;
    }
    public function getEmail(): string
    {
        return $this->email;
    }
    public function getRole(): string
    {
        return $this->role;
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

    // CONTACT METHODS
    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }
    public function createContactFromUserDetails(): void
    {
        $userId = $this->getAttribute('id');
        $userName = $this->getAttribute('name');
        $userEmail = $this->getAttribute('email');
        $userRole = $this->getAttribute('role');

        if ($userId !== null && $userId !== '') {
            $contactData = [
                'user_id' => $userId,
                'first_name' => $userName,
                'email' => $userEmail,
                'role' => $userRole
            ];

            $this->contacts()->create($contactData);
        }
    }
}
