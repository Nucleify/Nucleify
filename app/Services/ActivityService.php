<?php

namespace App\Services;

use Exception;

use App\Transformers\ActivityTransformer;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

readonly class ActivityService
{
    public function __construct(
        private Activity $model,
        protected string $entity = 'activity',
        private ActivityLoggerService $logger = new ActivityLoggerService()
    ) {}

    /**
     * @return array
     */
    public function index(): array
    {
        $causer = auth()->user();

        $model = $causer->isUser()
            ? $this->model->where('causer_id', $causer->id)->get()
            : $this->model->all();

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
        $causer = auth()->user();
        $referer = $request->header('referer');
        $lastWeek = now()->subWeek()->toDateString();
        $isRefererAdmin = $referer && !str_contains($referer, '/activity-log');

        $count = $this->model
            ->when(!$causer->isUser() || $isRefererAdmin, fn($query) => $query)
            ->where('causer_id', $causer->id)
            ->whereDate('created_at', '>=', $lastWeek)
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
        $causer = auth()->user();

        $model = $this->model::findOrFail($id);

        if ($causer->isUser() && $causer->id !== $model->causer_id) {
            $this->logger->logAndThrow(
                "User: ''$causer->name'' tried to fetch other user activity log, but he doesn't have permissions",
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
        $causer = auth()->user();

        $model = $causer->isUser()
            ? $this->model->where('causer_id', $causer->id)->findOrFail($id)
            : $this->model->findOrFail($id);

        $model->delete();
    }
}
