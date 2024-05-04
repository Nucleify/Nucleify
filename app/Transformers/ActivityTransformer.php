<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

use Spatie\Activitylog\Contracts\Activity;

class ActivityTransformer extends TransformerAbstract
{
    public function transform(Activity $activity): array
    {
        return [
            'id' => $activity->id,
            'causer_id' => $activity->causer_id,
            'description' => $activity->description,
            'created_at' => $activity->created_at->toDateTimeString(),
            'updated_at' => $activity->updated_at->toDateTimeString()
        ];
    }
}
