<?php

namespace App\Transformers;

use App\Contracts\QuestionContract;
use League\Fractal\TransformerAbstract;

class QuestionTransformer extends TransformerAbstract
{
    public function transform(QuestionContract $model): array
    {
        return [
            'id' => $model->getId(),
            'index' => $model->getIndex(),
            'content' => $model->getContent(),
            'answer' => $model->getAnswer(),
            'category' => $model->getCategory(),
            'on_site' => $model->getOnSite(),
            'display' => $model->getDisplay(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
