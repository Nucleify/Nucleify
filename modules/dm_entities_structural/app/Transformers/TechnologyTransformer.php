<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

use App\Contracts\TechnologyContract;

class TechnologyTransformer extends TransformerAbstract
{
    public function transform(TechnologyContract $model): array
    {
        return [
            'id' => $model->getId(),
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
