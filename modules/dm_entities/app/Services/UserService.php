<?php

namespace App\Services;

use App\Models\User;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\UserTransformer;
use Exception;
use Illuminate\Http\Request;

class UserService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly User $model,
        protected string $entity = 'user',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * @throws Exception
     */
    public function index(): array
    {
        $this->defineUserData();

        if (!$this->isCauserStaff) {
            $this->logger->logAndThrow(
                "User: ''{$this->causer->name}'' tried to fetch all users data, but he doesn't have permissions",
                'Only admins or tech users can fetch all users data'
            );
        }

        $this->logger->logMessage("User: ''{$this->causer->name}'' has fetched all users data");

        return fractal()
            ->collection($this->model->all())
            ->transformWith(new UserTransformer)
            ->toArray()['data'];
    }

    public function countByCreatedLastWeek(Request $request): int
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        if (!$this->isCauserStaff) {
            $this->logger->logAndThrow(
                "User: ''{$this->causer->name}'' tried to fetch all users data, but he doesn't have permissions",
                'Only admins or tech users can fetch all users data'
            );
        }

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)->count();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererAdmin);

        return $result;
    }

    /**
     * @throws Exception
     */
    public function show($id): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        if (!$this->isCauserStaff && $this->causer->id !== $result->id) {
            $this->logger->logAndThrow(
                "User: ''{$this->causer->name}'' tried to fetch other user data, but he doesn't have permissions",
                "You don't have permission to fetch this user"
            );
        }

        $this->logger->log($this->causer->name, $result->name, $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new UserTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function create(array $data): array
    {
        $this->defineUserData();

        if (!$this->isCauserStaff) {
            $this->logger->logAndThrow(
                "User: ''{$this->causer->name}'' tried to create a user, but he doesn't have permissions",
                'Only admins can create users'
            );
        }

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->name, $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new UserTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function update($id, array $data): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $conditions = [
            [str_contains($this->causer->name, 'Test Admin') && $this->model->isSuperAdmin(),
                "User: ''{$this->causer->name}'' tried to update super admin data, but he doesn't have permissions",
                "Test Admin can't update super admin",
            ],

            [str_contains($this->causer->name, 'Test Admin') && $this->model->isAdmin(),
                "User: ''{$this->causer->name}'' tried to update admin data, but he doesn't have permissions",
                "Test Admin can't update admin",
            ],

            [str_contains($this->causer->name, 'Test Admin') && $this->causer->id === $result->id,
                "User: ''{$this->causer->name}'' tried to update his user data, but he can't update himself",
                "Test Admin can't update himself",
            ],

            [str_contains($this->causer->name, 'Test Admin') && str_contains($result->name, 'Test'),
                "User: ''{$this->causer->name}'' tried to update test user data, but he can't update test users",
                "Test Admin can't update test users",
            ],

            [$this->causer->isAdmin() && $result->isSuperAdmin(),
                "Admin tried to update super admin data, but he doesn't have permissions",
                "Admin can't update super admin",
            ],

            [$this->causer->isUser() && $this->causer->id !== $result->id,
                "User: ''{$this->causer->name}'' tried to update other user data, but he doesn't have permissions",
                "Can't update other user without admin permissions",
            ],
        ];

        foreach ($conditions as [$condition, $logMessage, $exceptionMessage]) {
            if ($condition) {
                $this->logger->logAndThrow($logMessage, $exceptionMessage);
            }
        }

        $result->update($data);

        $this->logger->log($this->causer->name, $result->name, $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new UserTransformer)
            ->toArray()['data'];
    }

    /**
     * @return true[]
     *
     * @throws Exception
     */
    public function delete($id): array
    {
        $this->defineUserData();

        $result = User::findOrFail($id);

        $conditions = [
            [str_contains($this->causer->name, 'Test Admin') && $result->isSuperAdmin(),
                "User: ''{$this->causer->name}'' tried to delete super admin data, but he doesn't have permissions",
                "Test Admin can't delete super admin",
            ],

            [str_contains($this->causer->name, 'Test Admin') && $result->isAdmin(),
                "User: ''{$this->causer->name}'' tried to delete admin data, but he doesn't have permissions",
                "Test Admin can't delete admin",
            ],

            [str_contains($this->causer->name, 'Test Admin') && $this->causer->id === $result->id,
                "User: ''{$this->causer->name}'' tried to delete his user data, but he can't delete himself",
                "Test Admin can't delete himself",
            ],

            [str_contains($this->causer->name, 'Test Admin') && str_contains($result->name, 'Test'),
                "User: ''{$this->causer->name}'' tried to delete test user data, but he can't delete test users",
                "Test Admin can't delete test users",
            ],

            [$this->causer->isAdmin() && $result->isSuperAdmin(),
                "Admin tried to delete super admin data, but he doesn't have permissions",
                "Admin can't delete super admin",
            ],

            [$this->causer->isUser() && $this->causer->id !== $result->id,
                "User: ''{$this->causer->name}'' tried to delete other user data, but he doesn't have permissions",
                "Can't delete other user without admin permissions",
            ],
        ];

        foreach ($conditions as [$condition, $logMessage, $exceptionMessage]) {
            if ($condition) {
                $this->logger->logAndThrow($logMessage, $exceptionMessage);
            }
        }

        $result->delete();

        $this->logger->log($this->causer->name, $result->name, $this->entity, 'deleted');

        return ['success' => true];
    }
}
