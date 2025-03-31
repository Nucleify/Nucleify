<?php

namespace App\Services;

use App\Models\Card;
use App\Services\Utilities\Activity\LoggerService;
use App\Traits\Runners\Api\AuthRunnerTrait;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\CardTransformer;
use Illuminate\Http\Request;

class CardService 
{
    use AuthRunnerTrait;
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    /**
     * @param Card $model
     * @param string $entity
     * @param LoggerService $logger
     */
    public function __construct(
        private readonly Card $model,
        protected string $entity = 'card',
        private readonly LoggerService $logger = new LoggerService()
    ) {}

    /**
     * @param Request $request
     * 
     * @return mixed
     */
    public function index(Request $request): mixed
    {
        $this->defineRequestData($request);
        $this->defineUserData();
        $this->checkPermissions('index');

        $result = $this->model->all();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return fractal()
            ->collection($result)
            ->transformWith(new CardTransformer())
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
        $this->checkPermissions('countByCreatedLastWeek');

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)->count();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return ['count' => $result];
    }       

    /**
     * @param string $category
     *
     * @return array
     *
     * @throws Exception
     */
    public function getByCategory(string $category): array
    {
        $this->defineUserData();
        $this->checkPermissions('getByCategory');

        $result = $this->model::getByCategory($category)->get();

        $this->logger->logMessage($this->causer->name . ' fetched cards by category: ' . $category . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new CardTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     * 
     * @return array
     */
    public function show($id): array
    {
        $this->defineUserData();
        $this->checkPermissions('show');

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new CardTransformer())
            ->toArray()['data'];
    }

    /**
     * @param array $data
     * 
     * @return array
     */
    public function create(array $data): array
    {
        $this->defineUserData();
        $this->checkPermissions('create');

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new CardTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     * @param array $data
     * 
     * @return data
     */
    public function update($id, array $data): array
    {
        $this->defineUserData();
        $this->checkPermissions('update');

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new CardTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     * 
     * @return void
     */
    public function delete($id): void
    {
        $this->defineUserData();
        $this->checkPermissions('delete');

        $result = $this->model::findOrFail($id);

        $result->delete();

        $this->logger->log($this->causer->name, $result->getTitle(), $this->entity, 'deleted');
    }
}