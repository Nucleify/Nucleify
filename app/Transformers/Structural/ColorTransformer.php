<?php

namespace App\Transformers\Structural;

use App\Contracts\Structural\ColorContract;
use League\Fractal\TransformerAbstract;

class
ColorTransformer extends TransformerAbstract
{
    public function transform(ColorContract $model): array
    {
        return [
            'id' => $model->getId(),
            'user_id' => $model->getUserId(),
            'entity' => $model->getEntity(),
            'value' => $model->getValue(),
            'new' => $model->getNew(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
