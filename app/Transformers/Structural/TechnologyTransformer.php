<?php

namespace App\Transformers\Structural;

use App\Contracts\Structural\TechnologyContract;
use League\Fractal\TransformerAbstract;

class
TechnologyTransformer extends TransformerAbstract
{
    public function transform(TechnologyContract $model): array
    {
        return [
            'id' => $model->getId(),
            'user_id' => $model->getUserId(),
            'label' => $model->getLabel(),
            'description' => $model->getDescription(),
            'href' => $model->getHref(),
            'src' => $model->getSrc(),
            'category' => $model->getCategory(),
            'display' => $model->getDisplay(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
