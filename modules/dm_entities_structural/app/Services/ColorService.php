<?php

namespace App\Services;

use App\Models\Color;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\ColorTransformer;
use Exception;
use Illuminate\Http\Request;

class ColorService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Color $model,
        protected string $entity = 'color',
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
            ->transformWith(new ColorTransformer)
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
    public function getByValue(string $value): array
    {
        $this->defineUserData();

        $result = $this->model::getByValue($value)->get();

        $this->logger->logMessage($this->causer->name . ' fetched colors by value: ' . $value . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new ColorTransformer)
            ->toArray()['data'];
    }

    public function getSiteColors(string $site): array
    {
        $this->defineUserData();

        $result = $this->model::getByEntity($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched colors by site: ' . $site . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new ColorTransformer)
            ->toArray()['data'];
    }

    /**
     * @param  $id
     *
     * @throws Exception
     */

    /**
     * @throws Exception
     */
    public function getByEntity(string $entity): array
    {
        $this->defineUserData();

        $result = $this->model::getByEntity($entity)->get();

        $this->logger->logMessage($this->causer->name . ' fetched colors by entity: ' . $entity . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new ColorTransformer)
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
            ->transformWith(new ColorTransformer)
            ->toArray()['data'];
    }

    /**
     * @throws Exception
     */
    public function create(array $data): array
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getValue(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new ColorTransformer)
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

        $this->logger->log($this->causer->name, $result->getValue(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new ColorTransformer)
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

        $this->logger->log($this->causer->name, $model->getValue(), $this->entity, 'deleted');
    }
}
