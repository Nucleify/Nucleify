<?php

namespace App\Transformers\Structural;

use App\Contracts\Structural\CardContract;
use League\Fractal\TransformerAbstract;

class CardTransformer extends TransformerAbstract 
{
    public function transform(CardContract $model): array 
    {
        return [
            'id' => $model->getId(),
            'src' => $model->getSrc(),
            'title' => $model->getTitle(),
            'description' => $model->getDescription(),
            'component' => $model->getComponent(),
            'display' => $model->getDisplay(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt()
        ];
    }
}