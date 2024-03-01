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

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has fetched all users data'
            );

        return fractal()
            ->collection($model)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    public function getUserById($id): array
    {
        $model = $this->model::findOrFail($id);

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has fetched user: "'. $model->name
            );

        return fractal()
            ->item($model)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    public function createUser(array $data): array
    {
        $model = $this->model::create($data);

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has created user: "'. $model->name
            );

        return fractal()
            ->item($model)
            ->transformWith(new UserTransformer())
            ->toArray()['data'];
    }

    public function updateUser($id, array $data): array
    {
        $model = $this->model::findOrFail($id);

        $model->update($data);

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has updated user: "'. $model->name
            );

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
        $model = User::findOrFail($id);

        if ($model->id === $loggedInUserId) {
            throw new Exception('Cannot delete the logged-in user');
        } else {
            $model->delete();

            activity()
                ->causedBy(auth()->user())
                ->log(
                    'User:  "'. auth()->user()->name. '" has deleted user: "'. $model->name
                );
        }
    }
}
