<?php

namespace App\Services;

use App\Models\Link;
use App\Services\Utilities\Activity\LoggerService;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\LinkTransformer;
use Illuminate\Http\Request;

class LinkService {

    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    /**
     * @param Link $model
     * @param string $entity
     * @param LoggerService $logger
     */
    public function __construct(
        private readonly Link $model,
        protected string $entity = 'link',
        private readonly LoggerService $logger = new LoggerService()
    ) {}


    public function index(Request $request): mixed
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->model->all();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return fractal()
            ->collection($result)
            ->transformWith(new LinkTransformer())
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

        $result = $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->count();
        $this->logger->logCountByCreatedLastWeek($this->causer->name, $this->entity, $this->isRefererStructural);

        return ['count' => $result];
    }

    /**
     * @param string $category
     *
     * @return array
     */
    public function getByCategory(string $category): array
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($category)->get();

        $this->logger->logMessage($this->causer->name . ' fetched questions by category: ' . $category . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new LinkTransformer())
            ->toArray()['data'];
    }


    /**
     * @param string $site
     *
     * @return array
     */
    public function getSiteLinks(string $site): array
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name  . ' fetched questions by site: ' . $site . '.');

        return fractal()
            ->collection($result)
            ->transformWith(new LinkTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     *
     * @return array
     */
    public function show($id): array
    {

        $result = $this->model::findOrFail($id);

        return fractal()
            ->item($result)
            ->transformWith(new LinkTransformer())
            ->toArray()['data'];
    }



    /**
     * @param array $data
     *
     * @return array
     */
    public function create(array $data): array
    {
        $result = $this->model::create($data);

        return fractal()
            ->item($result)
            ->transformWith(new LinkTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     * @param array $data
     *
     * @return array
     */
    public function update($id, array $data): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->get(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new LinkTransformer())
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

        $model = $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($this->causer->name, $model->getHref(), $this->entity, 'deleted');
    }
}
