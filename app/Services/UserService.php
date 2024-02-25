<?php

namespace App\Services;

use App\Models\User;
use App\Transformers\UserTransformer;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function __construct(private readonly User $model){}

    public function getAllUsers()
    {
        $model = $this->model->all();

        return fractal()
            ->collection($model)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    public function getUserById($id): array
    {
        $model = $this->model::findOrFail($id);

        return fractal()
            ->item($model)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    public function createUser(array $data): array
    {
        $model = $this->model::create($data);

        return fractal()
            ->item($model)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    public function updateUser($id, array $data): array
    {
        $model = $this->model::findOrFail($id);

        $model->update($data);

        return fractal()
            ->item($model->fresh())
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function deleteUser($id)
    {
        $loggedInUserId = Auth::id();
        $user = User::findOrFail($id);

        if ($user->id === $loggedInUserId) {
            throw new Exception('Cannot delete the logged-in user');
        } else {
            $user->delete();
        }
    }
}
