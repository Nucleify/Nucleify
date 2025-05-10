<?php

namespace App\Services;

use App\Models\Feature;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\FeatureTransformer;
use Illuminate\Http\Request;

class FeatureService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Feature $model,
        protected string $entity = 'feature',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    public function index(Request $request): mixed
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->model->all();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return fractal()
            ->collection($result)
            ->transformWith(new FeatureTransformer)
            ->toArray()['data'];
    }

    public function countByCreatedLastWeek(Request $request): int
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)
            ->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererStructural);

        return $result;
    }

    public function getByCategory(string $category): array
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($category)->get();

        $this->logger->logMessage($this->causer->name . ' fetched features by category: ' . $category . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new FeatureTransformer)
            ->toArray()['data'];
    }

    public function getSiteFeatures(string $site): array
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched features by site: ' . $site . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new FeatureTransformer)
            ->toArray()['data'];
    }

    public function show($id): array
    {
        $result = $this->model::findOrFail($id);

        return fractal()
            ->item($result)
            ->transformWith(new FeatureTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function create(array $data): array
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getHeader(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new FeatureTransformer)
            ->toArray()['data'];
    }

    public function update($id, array $data): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getHeader(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new FeatureTransformer)
            ->toArray()['data'];
    }

    public function delete($id): void
    {
        $this->defineUserData();

        $model = $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($this->causer->name, $model->getHeader(), $this->entity, 'deleted');
    }
}
