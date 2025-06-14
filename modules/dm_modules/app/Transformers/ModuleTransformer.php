<?php

namespace App\Transformers;

use App\Contracts\ModuleContract;
use League\Fractal\TransformerAbstract;

class ModuleTransformer extends TransformerAbstract
{
    public function transform(ModuleContract $model): array
    {
        return [
            'id' => $model->getId(),
            'name' => $model->getName(),
            'description' => $model->getDescription(),
            'category' => $model->getCategory(),
            'version' => $model->getVersion(),
            'enabled' => $model->getEnabled(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
