<?php

namespace App\Services;

use App\Models\SystemColor;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\SystemColorTransformer;
use Exception;
use Illuminate\Http\Request;

class SystemColorService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly SystemColor $model,
        protected string $entity = 'system color',
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
            ->transformWith(new SystemColorTransformer)
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

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererStructural);

        return $result;
    }

    /**
     * @throws Exception
     */
    public function getByName(string $name): array
    {
        $this->defineUserData();

        $result = $this->model::getByName($name)->get();

        $this->logger->logMessage($this->causer->name . ' fetched system colors by name: ' . $name . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new SystemColorTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function show($id): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getValue(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new SystemColorTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function create(array $data): array
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new SystemColorTransformer)
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

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new SystemColorTransformer)
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

        $this->logger->log($this->causer->name, $model->getName(), $this->entity, 'deleted');
    }
}
