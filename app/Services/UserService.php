<?php

namespace App\Services;

use App\Models\User;
use App\Transformers\UserTransformer;
use Exception;

class UserService
{
    public function __construct(private readonly User $model){}

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $model = $this->model->all();
        $causer = auth()->user();

        switch (true) {
            case $causer->isUser():
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to fetch all users data, but he doesn\'t have permissions'
                    );
                throw new Exception('Only admins or tech users can fetch all users data');

            default:
                activity()
                    ->log(
                        '"'. $causer->name. '" has fetched all users data'
                    );

                return fractal()
                    ->collection($model)
                    ->transformWith(new UserTransformer())
                    ->toArray()['data'];
        }
    }

    /**
     * @throws Exception
     */
    public function getById($id): array
    {
        $model = $this->model::findOrFail($id);
        $causer = auth()->user();

        switch (true) {
            case $causer->isUser() && $causer->id !== $model->id:
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to fetch other user data, but he doesn\'t have permissions'
                    );
                throw new Exception('You don\'t have permission to fetch this user');

            default:
                activity()
                    ->log(
                        '"'. $causer->name. '" has fetched user: "'. $model->name . '"'
                    );

                return fractal()
                    ->item($model)
                    ->transformWith(new UserTransformer())
                    ->toArray()['data'];
        }
    }

    /**
     * @throws Exception
     */
    public function create(array $data): array
    {
        $causer = auth()->user();

        switch (true) {
            case $causer->isUser():
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to create user, but he doesn\'t have permissions'
                    );
                throw new Exception('Only admins can create users');

            default:
                $model = $this->model::create($data);

                activity()
                    ->log(
                        '"'. $causer->name. '" has created user: "'. $model->name . '"'
                    );

                return fractal()
                    ->item($model)
                    ->transformWith(new UserTransformer())
                    ->toArray()['data'];
        }
    }

    /**
     * @throws Exception
     */
    public function update($id, array $data): array
    {
        $model = $this->model::findOrFail($id);
        $causer = auth()->user();

        switch (true) {
            case str_contains($causer->name, 'Test Admin') && $model->isSuperAdmin():
                activity()
                    ->log(
                        'Test Admin tried to edit super admin data, but he doesn\'t have permissions'
                    );
                throw new Exception('Test Admin can\'t edit super admin');

            case str_contains($causer->name, 'Test Admin') && $model->isAdmin():
                activity()
                    ->log(
                        'Test Admin tried to edit admin data, but he doesn\'t have permissions'
                    );
                throw new Exception('Test Admin can\'t edit admin');

            case str_contains($causer->name, 'Test Admin') && str_contains($model->name, 'Test'):
                activity()
                    ->log(
                        'Test Admin tried to edit test user data, but he can\'t delete test users'
                    );
                throw new Exception('Test Admin can\'t edit test users');

            case $causer->isUser() && $causer->id !== $model->id:
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to edit other user data, but he doesn\'t have permissions'
                    );
                throw new Exception('You don\'t have permission to edit other user data');

            case $causer->isAdmin() && $model->isSuperAdmin:
                activity()
                    ->log(
                        'Admin tried to edit super admin data, but he doesn\'t have permissions'
                    );
                throw new Exception('Admin can\'t edit super admin');

            default:
                $model->update($data);

                activity()
                    ->log(
                        '"'. $causer->name. '" has updated user: "'. $model->name . '"'
                    );

                return fractal()
                    ->item($model->fresh())
                    ->transformWith(new UserTransformer())
                    ->toArray()['data'];
        }
    }

    /**
     * @throws Exception
     */
    public function delete($id): array
    {
        $model = User::findOrFail($id);
        $causer = auth()->user();

        switch (true) {
            case str_contains($causer->name, 'Test Admin') && $model->isSuperAdmin():
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to delete super admin data, but he doesn\'t have permissions'
                    );
                throw new Exception('Test Admin can\'t delete super admin');

            case str_contains($causer->name, 'Test Admin') && $model->isAdmin():
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to delete admin data, but he doesn\'t have permissions'
                    );
                throw new Exception('Test Admin can\'t delete admin');

            case str_contains($causer->name, 'Test Admin') && $causer->id === $model->id:
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to delete his user data, but he can\'t delete himself'
                    );
                throw new Exception('Test Admin can\'t delete himself');

            case str_contains($causer->name, 'Test Admin') && str_contains($model->name, 'Test'):
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to delete test user data, but he can\'t delete test users'
                    );
                throw new Exception('Test Admin can\'t delete test users');

            case $causer->isAdmin() && $model->isSuperAdmin():
                activity()
                    ->log(
                        'Admin tried to delete super admin data, but he doesn\'t have permissions'
                    );
                throw new Exception('Admin can\'t delete super admin');

            case $causer->isUser() && $causer->id !== $model->id:
                activity()
                    ->log(
                        '"'. $causer->name. '" tried to delete other user data, but he doesn\'t have permissions'
                    );
                throw new Exception('Can\'t delete other user without admin permissions');

            default:
                $model->delete();

                activity()
                    ->log(
                        '"'. $causer->name. '" has deleted user: "'. $model->name . '"'
                    );

                return ['success' => true];
        }
    }
}
