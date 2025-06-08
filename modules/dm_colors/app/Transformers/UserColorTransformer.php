<?php

namespace App\Transformers;

use App\Contracts\UserColorContract;
use League\Fractal\TransformerAbstract;

class UserColorTransformer extends TransformerAbstract
{
    public function transform(UserColorContract $model): array
    {
        return [
            'id' => $model->getId(),
            'user_id' => $model->getUserId(),
            'name' => $model->getName(),
            'value' => $model->getValue(),
            'new' => $model->getNew(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
