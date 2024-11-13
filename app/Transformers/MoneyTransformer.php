<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

use App\Contracts\MoneyContract;

class MoneyTransformer extends TransformerAbstract
{
    public function transform(MoneyContract $model): array
    {
        return [
            'count' => $model->getCount(),
            'id' => $model->getId(),
            'sender_id' =>  $model->getSenderId(),
            'receiver_id' =>  $model->getReceiverId(),
            'title' =>  $model->getTitle(),
            'description' =>  $model->getDescription(),
            'category' =>  $model->getCategory(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
