<?php

namespace App\Models;

use App\Contracts\UserShouldReceiveFields;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Multicaret\Acquaintances\Traits\Friendable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int id
 * @property string name
 * @property string email
 * @property string password
 * @property string role
 * @property DateTime created_at
 * @property DateTime updated_at
 * @property int getId
 * @property string getName
 * @property string getEmail
 * @property string getRole
 * @property string getCreatedAt
 * @property string getUpdatedAt
 * @property bool isUser
 * @property bool isTech
 * @property bool isTestAdmin
 * @property bool isAdmin
 * @property bool isSuperAdmin
 * @property HasMany contacts
 * @property void createContactFromUserDetails
 */

class User extends Authenticatable implements UserShouldReceiveFields
{
    use HasApiTokens, HasFactory, Friendable, Notifiable;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    protected $fillable = [
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
    public function getCreatedAt(): string
    {
        return $this->created_at;
    }
    public function getUpdatedAt(): string
    {
        return $this->updated_at;
    }

    // AUTH METHODS
    public function isUser(): bool
    {
        return $this->role === 'user';
    }
    public function isTech(): bool
    {
        return $this->role === 'tech';
    }
    public function isTestAdmin(): bool
    {
        return $this->role === 'test_admin';
    }
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    /**
     *  ARTICLES METHODS
     */
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    /**
     *  CONTACT METHODS
     */
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
