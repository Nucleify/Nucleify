<?php

namespace App\Transformers;

use App\Contracts\MoneyContract;
use League\Fractal\TransformerAbstract;

class MoneyTransformer extends TransformerAbstract
{
    public function transform(MoneyContract $model): array
    {
        return [
            'id' => $model->getId(),
            'user_id' => $model->getUserId(),
            'sender' => $model->getSender(),
            'receiver' => $model->getReceiver(),
            'count' => $model->getCount(),
            'title' => $model->getTitle(),
            'description' => $model->getDescription(),
            'category' => $model->getCategory(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
