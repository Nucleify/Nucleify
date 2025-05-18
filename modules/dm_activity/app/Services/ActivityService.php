<?php

namespace App\Services;

use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\ActivityTransformer;
use Exception;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class ActivityService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Activity $model,
        protected string $entity = 'activity',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    public function index(): array
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model->all()
            : $this->model->where('causer_id', $this->causer->id)->get();

        return fractal()
            ->collection($result)
            ->transformWith(new ActivityTransformer)
            ->toArray()['data'];
    }

    public function countByCreatedLastWeek(Request $request): int
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->count()
            : $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->where('user_id', $this->causer->id)
                ->count();

        return $result;
    }

    /**
     * @throws Exception
     */
    public function show(int $id): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        if (!$this->isCauserStaff && $this->causer->id !== $result->causer_id) {
            $this->logger->logAndThrow(
                "User: ''$this->causer->name'' tried to fetch other user activity log, but he doesn't have permissions",
                "You don't have permission to fetch other users activity log"
            );
        } else {
            return fractal()
                ->item($result)
                ->transformWith(new ActivityTransformer)
                ->toArray()['data'];
        }
    }

    public function delete($id): void
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model->findOrFail($id)
            : $this->model->where('causer_id', $this->causer->id)->findOrFail($id);

        $result->delete();
    }
}
