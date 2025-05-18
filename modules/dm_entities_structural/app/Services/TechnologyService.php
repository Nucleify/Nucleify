<?php

namespace App\Services;

use App\Models\Technology;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\TechnologyTransformer;
use Exception;
use Illuminate\Http\Request;

class TechnologyService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Technology $model,
        protected string $entity = 'technology',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * @throws Exception
     */
    public function index(Request $request): mixed
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->model->all();

        $this->logger->logIndex($this->causer->name, $this->entity, true);

        return fractal()
            ->collection($result)
            ->transformWith(new TechnologyTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function countByCreatedLastWeek(Request $request): int
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, true);

        return $result;
    }

    /**
     * @throws Exception
     */
    public function getByCategory(string $category): array
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($category)->get();

        $this->logger->logMessage($this->causer->name . ' fetched technologies by category: ' . $category . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new TechnologyTransformer)
            ->toArray()['data'];
    }

    public function getSiteTechnologies(string $site): array
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched technologies by site: ' . $site . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new TechnologyTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function show($id): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getLabel(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new TechnologyTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function create(array $data): array
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getLabel(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new TechnologyTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function update($id, array $data): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getLabel(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new TechnologyTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function delete($id): void
    {
        $this->defineUserData();

        $model = $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($this->causer->name, $model->getLabel(), $this->entity, 'deleted');
    }
}
