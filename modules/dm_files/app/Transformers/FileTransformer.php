<?php

namespace App\Transformers;

use App\Contracts\FileContract;
use League\Fractal\TransformerAbstract;

class FileTransformer extends TransformerAbstract
{
    public function transform(FileContract $model): array
    {
        return [
            'id' => $model->getId(),
            'user_id' => $model->getUserId(),
            'path' => $model->getPath(),
            'mime_type' => $model->getMimeType(),
            'size' => $model->getSize(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
