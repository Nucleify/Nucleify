<?php

namespace App\Services\Utilities\Activity;

use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\Utilities\ActivityTransformer;
use Exception;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class ActivityService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    /**
     * @param Activity $model
     * @param string $entity
     * @param LoggerService $logger
     */
    public function __construct(
        private readonly Activity $model,
        protected string $entity = 'activity',
        private readonly LoggerService $logger = new LoggerService()
    ) {}

    /**
     * @return array
     */
    public function index(): array
    {
        $this->defineUserData();

        $model = $this->isCauserStaff
            ? $this->model->all()
            : $this->model->where('causer_id', $this->causer->id)->get();

        return fractal()
            ->collection($model)
            ->transformWith(new ActivityTransformer())
            ->toArray()['data'];
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function countByCreatedLastWeek(Request $request): array
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $count = $this->isCauserStaff
            ? $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->count()
            : $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->where('user_id', $this->causer->id)
                ->count();

        return ['count' => $count];
    }

    /**
     * @param int $id
     *
     * @return array
     *
     * @throws Exception
     */
    public function show(int $id): array
    {
        $this->defineUserData();

        $model = $this->model::findOrFail($id);

        if (!$this->isCauserStaff && $this->causer->id !== $model->causer_id) {
            $this->logger->logAndThrow(
                "User: ''$this->causer->name'' tried to fetch other user activity log, but he doesn't have permissions",
                "You don't have permission to fetch other users' activity log"
            );
        } else {
            return fractal()
                ->item($model)
                ->transformWith(new ActivityTransformer())
                ->toArray()['data'];
        }
    }

    /**
     * @param $id
     *
     * @return void
     */
    public function delete($id): void
    {
        $this->defineUserData();

        $model = $this->isCauserStaff
            ? $this->model->findOrFail($id)
            : $this->model->where('causer_id', $this->causer->id)->findOrFail($id);

        $model->delete();
    }
}
