<?php

namespace App\Transformers;

use App\Contracts\LinkContract;
use League\Fractal\TransformerAbstract;

class LinkTransformer extends TransformerAbstract
{
    public function transform(LinkContract $model): array
    {
        return [
            'id' => $model->getId(),
            'download' => $model->getDownload(),
            'href' => $model->getHref(),
            'src' => $model->getSrc(),
            'icon' => $model->getIcon(),
            'category' => $model->getCategory(),
            'hreflang' => $model->getHreflang(),
            'media' => $model->getMedia(),
            'ping' => $model->getPing(),
            'referrerpolicy' => $model->getReferrerPolicy(),
            'rel' => $model->getRel(),
            'target' => $model->getTarget(),
            'type' => $model->getType(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt(),
        ];
    }
}
