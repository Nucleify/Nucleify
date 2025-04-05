<?php

namespace App\Services;

use Exception;
use Illuminate\Http\Request;

use App\Models\Color;
use App\Services\LoggerService;
use App\Traits\Runners\Api\AuthRunnerTrait;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\ColorTransformer;

class ColorService
{
    use AuthRunnerTrait;
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    /**
     * @param Color $model
     * @param string $entity
     * @param LoggerService $logger
     */
    public function __construct(
        private readonly Color $model,
        protected string $entity = 'color',
        private readonly LoggerService $logger = new LoggerService()
    ) {}

    /**
     * @param Request $request
     *
     * @return mixed
     *
     * @throws Exception
     */
    public function index(Request $request): mixed
    {
        $this->defineRequestData($request);
        $this->defineUserData();
        $this->checkPermissions('index');

        $result = $this->model->all();

        $this->logger->logIndex($this->causer->name, $this->entity, true);

        return fractal()
            ->collection($result)
            ->transformWith(new ColorTransformer())
            ->toArray()['data'];
    }

    /**
     * @param Request $request
     *
     * @return array
     *
     * @throws Exception
     */
    public function countByCreatedLastWeek(Request $request): array
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();
        $this->checkPermissions('countByCreatedLastWeek');

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)->count();

        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererStructural);

        return ['count' => $result];
    }

    /**
     * @param string $value
     *
     * @return array
     *
     * @throws Exception
     */
    public function getByValue(string $value): array
    {
        $this->defineUserData();
        $this->checkPermissions('getByValue');

        $result = $this->model::getByValue($value)->get();

        $this->logger->logMessage($this->causer->name . ' fetched colors by value: ' . $value . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new ColorTransformer())
            ->toArray()['data'];
    }

    /**
     * @param string $site
     *
     * @return array
     */
    public function getSiteColors(string $site): array
    {
        $this->defineUserData();

        $result = $this->model::getByEntity($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name  . ' fetched colors by site: ' . $site . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new ColorTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     *
     * @return array
     *
     * @throws Exception
     */

    /**
     * @param string $entity
     * @return array
     * @throws Exception
     */
    public function getByEntity(string $entity): array
    {
        $this->defineUserData();
        $this->checkPermissions('getByEntity');

        $result = $this->model::getByEntity($entity)->get();

        $this->logger->logMessage($this->causer->name . ' fetched colors by entity: ' . $entity . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new ColorTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     *
     * @return array
     *
     * @throws Exception
     */

    public function show($id): array
    {
        $this->defineUserData();
        $this->checkPermissions('show');

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getValue(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new ColorTransformer())
            ->toArray()['data'];
    }

    /**
     * @param array $data
     *
     * @return array
     *
     * @throws Exception
     */
    public function create(array $data): array
    {
        $this->defineUserData();
        $this->checkPermissions('create');

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getValue(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new ColorTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     * @param array $data
     *
     * @return array
     *
     * @throws Exception
     */
    public function update($id, array $data): array
    {
        $this->defineUserData();
        $this->checkPermissions('update');

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getValue(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new ColorTransformer())
            ->toArray()['data'];

    }

    /**
     * @param $id
     *
     * @return void
     *
     * @throws Exception
     */
    public function delete($id): void
    {
        $this->defineUserData();
        $this->checkPermissions('delete');

        $model = $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($this->causer->name, $model->getValue(), $this->entity, 'deleted');
    }
}
