<?php

namespace App\Services;

use Exception;
use Illuminate\Http\Request;

use App\Models\User;
use App\Transformers\UserTransformer;

class UserService
{
    /**
     * @param User $model
     * @param string $entity
     * @param ActivityLoggerService $logger
     */
    public function __construct(
        private readonly User $model,
        protected string $entity = 'user',
        private readonly ActivityLoggerService $logger = new ActivityLoggerService()
    ) {}

    /**
     * @return array
     *
     * @throws Exception
     */
    public function index(): array
    {
        $causer = auth()->user();

        if ($causer->isUser()) {
            $this->logger->logAndThrow(
                "User: ''$causer->name'' tried to fetch all users data, but he doesn't have permissions",
                'Only admins or tech users can fetch all users data'
            );
        }

        $this->logger->logMessage("User: ''$causer->name'' has fetched all users data");

        return fractal()
            ->collection($this->model->all())
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function countByCreatedLastWeek(Request $request): array
    {
        $causer = auth()->user();
        $referer = $request->header('referer');
        $lastWeek = now()->subWeek()->toDateString();
        $isRefererAdmin = $referer && !str_contains($referer, '/users');

        $count = $this->model
            ->when(!$causer->isUser() || $isRefererAdmin, fn($query) => $query)
            ->whereDate('created_at', '>=', $lastWeek)
            ->count();

        $this->logger->logIndex($causer->name, $this->entity, $isRefererAdmin);

        return ['count' => $count];
    }

    /**
     * @param $id
     *
     * @return array
     *
     * @throws Exception
     */
    public function show($id): array
    {
        $model = $this->model::findOrFail($id);

        $causer = auth()->user();

        if ($causer->isUser() && $causer->id !== $model->id) {
            $this->logger->logAndThrow(
                "User: ''$causer->name'' tried to fetch other user data, but he doesn't have permissions",
                "You don't have permission to fetch this user"
            );
        }

        $this->logger->log($causer->name, $model->name, $this->entity, 'showed');

        return fractal()
            ->item($model)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    /**
     * @param array $data
     *
     * @return array
     *
     * @throws Exception
     */
    public function create(array $data): array
    {
        $causer = auth()->user();

        if ($causer->isUser()) {
            $this->logger->logAndThrow(
                "User: ''$causer->name'' tried to create a user, but he doesn't have permissions",
                "Only admins can create users"
            );
        }

        $model = $this->model::create($data);

        $this->logger->log($causer->name, $model->name, $this->entity, 'created');

        return fractal()
            ->item($model)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     * @param array $data
     *
     * @return array
     *
     * @throws Exception
     */
    public function update($id, array $data): array
    {
        $model = $this->model::findOrFail($id);

        $causer = auth()->user();

        $conditions = [
            [str_contains($causer->name, 'Test Admin') && $model->isSuperAdmin(),
                "User: ''$causer->name'' tried to update super admin data, but he doesn't have permissions",
                "Test Admin can't update super admin"
            ],

            [str_contains($causer->name, 'Test Admin') && $model->isAdmin(),
                "User: ''$causer->name'' tried to update admin data, but he doesn't have permissions",
                "Test Admin can't update admin"
            ],

            [str_contains($causer->name, 'Test Admin') && $causer->id === $model->id,
                "User: ''$causer->name'' tried to update his user data, but he can't update himself",
                "Test Admin can't update himself"
            ],

            [str_contains($causer->name, 'Test Admin') && str_contains($model->name, 'Test'),
                "User: ''$causer->name'' tried to update test user data, but he can't update test users",
                "Test Admin can't update test users"
            ],

            [$causer->isAdmin() && $model->isSuperAdmin(),
                "Admin tried to update super admin data, but he doesn't have permissions",
                "Admin can't update super admin"
            ],

            [$causer->isUser() && $causer->id !== $model->id,
                "User: ''$causer->name'' tried to update other user data, but he doesn't have permissions",
                "Can't update other user without admin permissions"
            ],
        ];

        foreach ($conditions as [$condition, $logMessage, $exceptionMessage]) {
            if ($condition) {
                $this->logger->logAndThrow($logMessage, $exceptionMessage);
            }
        }

        $model->update($data);

        $this->logger->log($causer->name, $model->name, $this->entity, 'updated');

        return fractal()
            ->item($model->fresh())
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     *
     * @return true[]
     *
     * @throws Exception
     */
    public function delete($id): array
    {
        $model = User::findOrFail($id);

        $causer = auth()->user();

        $conditions = [
            [str_contains($causer->name, 'Test Admin') && $model->isSuperAdmin(),
                "User: ''$causer->name'' tried to delete super admin data, but he doesn't have permissions",
                "Test Admin can't delete super admin"
            ],

            [str_contains($causer->name, 'Test Admin') && $model->isAdmin(),
                "User: ''$causer->name'' tried to delete admin data, but he doesn't have permissions",
                "Test Admin can't delete admin"
            ],

            [str_contains($causer->name, 'Test Admin') && $causer->id === $model->id,
                "User: ''$causer->name'' tried to delete his user data, but he can't delete himself",
                "Test Admin can't delete himself"
            ],

            [str_contains($causer->name, 'Test Admin') && str_contains($model->name, 'Test'),
                "User: ''$causer->name'' tried to delete test user data, but he can't delete test users",
                "Test Admin can't delete test users"
            ],

            [$causer->isAdmin() && $model->isSuperAdmin(),
                "Admin tried to delete super admin data, but he doesn't have permissions",
                "Admin can't delete super admin"
            ],

            [$causer->isUser() && $causer->id !== $model->id,
                "User: ''$causer->name'' tried to delete other user data, but he doesn't have permissions",
                "Can't delete other user without admin permissions"
            ],
        ];

        foreach ($conditions as [$condition, $logMessage, $exceptionMessage]) {
            if ($condition) {
                $this->logger->logAndThrow($logMessage, $exceptionMessage);
            }
        }

        $model->delete();

        $this->logger->log($causer->name, $model->name, $this->entity, 'deleted');

        return ['success' => true];
    }
}
