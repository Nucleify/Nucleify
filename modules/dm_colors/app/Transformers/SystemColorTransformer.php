<?php

namespace App\Transformers;

use App\Contracts\SystemColorContract;
use League\Fractal\TransformerAbstract;

class SystemColorTransformer extends TransformerAbstract
{
    public function transform(SystemColorContract $model): array
    {
        return [
            'id' => $model->getId(),
            'name' => $model->getName(),
            'value' => $model->getValue(),
            'new' => $model->getNew(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
