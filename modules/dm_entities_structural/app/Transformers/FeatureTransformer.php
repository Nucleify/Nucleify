<?php

namespace App\Transformers;

use App\Contracts\FeatureContract;
use League\Fractal\TransformerAbstract;

class FeatureTransformer extends TransformerAbstract
{
    public function transform(FeatureContract $model): array
    {
        return [
            'id' => $model->getId(),
            'icon' => $model->getIcon(),
            'header' => $model->getHeader(),
            'description' => $model->getDescription(),
            'category' => $model->getCategory(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
