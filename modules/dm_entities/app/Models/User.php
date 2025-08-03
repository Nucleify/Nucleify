<?php

namespace App\Models;

use App\Contracts\UserContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Multicaret\Acquaintances\Traits\Friendable;

/**
 * @property int id
 * @property string name
 * @property string email
 * @property string password
 * @property string role
 * @property string created_at
 * @property string updated_at
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
 * @property bool isStaff
 * @property bool hasRole
 * @property Builder scopeGetById
 * @property Builder scopeGetByName
 * @property Builder scopeGetByEmail
 * @property Builder scopeGetByRole
 * @property Builder scopeGetByCreatedAt
 * @property Builder scopeGetByUpdatedAt
 * @property Builder scopeGetByUserRole
 * @property Builder scopeGetByTechRole
 * @property Builder scopeGetByTestAdminRole
 * @property Builder scopeGetByAdminRole
 * @property Builder scopeGetBySuperAdminRole
 * @property HasMany contacts
 * @property HasMany money
 * @property HasMany card
 * @property HasMany question
 * @property void createContactFromUserDetails
 */
class User extends Authenticatable implements UserContract
{
    use Friendable, HasApiTokens, HasFactory, Notifiable;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    protected $fillable = [
        'name',
        'email',
        'password',
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

    public function isStaff(): bool
    {
        return $this->hasRole(['tech', 'test_admin', 'admin', 'super_admin']);
    }

    public function hasRole($roles): bool
    {
        $roles = is_array($roles) ? $roles : [$roles];

        return in_array($this->role, $roles);
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

    public function scopeGetByEmail(Builder $query, string $parameter): Builder
    {
        return $query->where('email', $parameter);
    }

    public function scopeGetByRole(Builder $query, string $parameter): Builder
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

    public function scopeGetByUserRole(Builder $query): Builder
    {
        return $query->where('role', 'user');
    }

    public function scopeGetByTechRole(Builder $query): Builder
    {
        return $query->where('role', 'tech');
    }

    public function scopeGetByTestAdminRole(Builder $query): Builder
    {
        return $query->where('role', 'test_admin');
    }

    public function scopeGetByAdminRole(Builder $query): Builder
    {
        return $query->where('role', 'admin');
    }

    public function scopeGetBySuperAdminRole(Builder $query): Builder
    {
        return $query->where('role', 'super_admin');
    }

    /**
     *  Relational methods
     */
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

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
                'role' => $userRole,
            ];

            $this->contacts()->create($contactData);
        }
    }

    public function money(): HasMany
    {
        return $this->hasMany(Money::class, 'user_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'user_id');
    }

    public function card(): HasMany
    {
        return $this->hasMany(Card::class);
    }

    public function question(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function userColors(): HasMany
    {
        return $this->hasMany(UserColor::class);
    }
}
