<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

use App\Contracts\ArticleShouldReceiveFields;

class ArticleTransformer extends TransformerAbstract
{
    public function transform(ArticleShouldReceiveFields $model): array
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
