<?php

namespace App\Services;

use Exception;

use App\Models\User;
use App\Transformers\UserTransformer;

class UserService
{
    public function __construct(
        private readonly User $model,
        protected string $entity = 'user',
        private readonly ActivityLoggerService $logger = new ActivityLoggerService()
    ) {}

    /**
     * @throws Exception
     */
    public function getAll(): array
    {
        $model = $this->model->all();
        $causer = auth()->user();

        switch (true) {
            case $causer->isUser():
                $this->logger->logAndThrow(
                    $causer->name. ' tried to fetch all users data, but he doesn\'t have permissions',
                    'Only admins or tech users can fetch all users data'
                );

            default:
                $this->logger->logMessage($causer->name. ' has fetched all users data');

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
                $this->logger->logAndThrow(
                    $causer->name. ' tried to fetch other user data, but he doesn\'t have permissions',
                    'You don\'t have permission to fetch this user'
                );

            default:
                $this->logger->log($causer, $model, $this->entity, 'showed');

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
                $this->logger->logAndThrow(
                    $causer->name. ' tried to create user, but he doesn\'t have permissions',
                    'Only admins can create users'
                );

            default:
                $model = $this->model::create($data);

                $this->logger->log($causer, $model, $this->entity, 'created');

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
                $this->logger->logAndThrow(
                    'Test Admin tried to edit super admin data, but he doesn\'t have permissions',
                    'Test Admin can\'t edit super admin'
                );

            case str_contains($causer->name, 'Test Admin') && $model->isAdmin():
                $this->logger->logAndThrow(
                    'Test Admin tried to edit admin data, but he doesn\'t have permissions',
                    'Test Admin can\'t edit admin'
                );

            case str_contains($causer->name, 'Test Admin') && str_contains($model->name, 'Test'):
                $this->logger->logAndThrow(
                    'Test Admin tried to edit test user data, but he can\'t edit test users',
                    'Test Admin can\'t edit test users'
                );

            case $causer->isUser() && $causer->id !== $model->id:
                $this->logger->logAndThrow(
                    $causer->name. ' tried to edit other user data, but he doesn\'t have permissions',
                    'You don\'t have permission to edit other user data'
                );

            case $causer->isAdmin() && $model->isSuperAdmin:
                $this->logger->logAndThrow(
                    'Admin tried to edit super admin data, but he doesn\'t have permissions',
                    'Admin can\'t edit super admin'
                );

            default:
                $model->update($data);

                $this->logger->log($causer, $model, $this->entity, 'updated');

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
                $this->logger->logAndThrow(
                    $causer->name. ' tried to delete super admin data, but he doesn\'t have permissions',
                    'Test Admin can\'t delete super admin'
                );

            case str_contains($causer->name, 'Test Admin') && $model->isAdmin():
                $this->logger->logAndThrow(
                    $causer->name. ' tried to delete admin data, but he doesn\'t have permissions',
                    'Test Admin can\'t delete admin'
                );

            case str_contains($causer->name, 'Test Admin') && $causer->id === $model->id:
                $this->logger->logAndThrow(
                    $causer->name. ' tried to delete his user data, but he can\'t delete himself',
                    'Test Admin can\'t delete himself'
                );

            case str_contains($causer->name, 'Test Admin') && str_contains($model->name, 'Test'):
                $this->logger->logAndThrow(
                    $causer->name. ' tried to delete test user data, but he can\'t delete test users',
                    'Test Admin can\'t delete test users'
                );

            case $causer->isAdmin() && $model->isSuperAdmin():
                $this->logger->logAndThrow(
                    'Admin tried to delete super admin data, but he doesn\'t have permissions',
                    'Admin can\'t delete super admin'
                );

            case $causer->isUser() && $causer->id !== $model->id:
                $this->logger->logAndThrow(
                    $causer->name. ' tried to delete other user data, but he doesn\'t have permissions',
                    'Can\'t delete other user without admin permissions'
                );

            default:
                $model->delete();

                $this->logger->log($causer, $model, $this->entity, 'deleted');

                return ['success' => true];
        }
    }
}
