<?php

namespace App\Transformers\Entities;

use App\Contracts\Entities\ArticleContract;
use League\Fractal\TransformerAbstract;

class ArticleTransformer extends TransformerAbstract
{
    public function transform(ArticleContract $model): array
    {
        return [
            'id' => $model->getId(),
            'title' =>  $model->getTitle(),
            'description' =>  $model->getDescription(),
            'category' =>  $model->getCategory(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
