export function removeUserFromSessionStorage(): void {
    const userKeys = [
        'id',
        'name',
        'email',
        'role',
        'created_at',
        'updated_at',
        'email_verified_at'
    ];

    userKeys.forEach((key) => {
        window.sessionStorage.removeItem(`user_${key}`);
    });
}
