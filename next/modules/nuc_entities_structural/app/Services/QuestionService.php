<?php

namespace App\Services;

use App\Models\Question;
use App\Resources\QuestionResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class QuestionService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Question $model,
        protected string $entity = 'question',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    /**
     * @param Request $request
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->model->all();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return QuestionResource::collection($result);
    }

    /**
     * @param Request $request
     *
     * @return int
     *
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
     * @param string $category
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getByCategory(string $category): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($category)->get();

        $this->logger->logMessage($this->causer->name . ' fetched questions by category: ' . $category . '.');

        return QuestionResource::collection($result);
    }

    /**
     * @param string $site
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getSiteQuestions(string $site): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched questions by site: ' . $site . '.');

        return QuestionResource::collection($result);
    }

    /**
     * @param string $site
     * @param string $lang
     *
     * @return AnonymousResourceCollection
     *
     * @throws Exception
     */
    public function getSiteQuestionsByLang(string $site, string $lang): AnonymousResourceCollection
    {
        $this->defineUserData();

        $result = $this->model::getByCategory($site)->where('lang', $lang)->get();

        $name = $this->causer ? $this->causer->name : 'Guest';

        $this->logger->logMessage($name . ' fetched questions by site: ' . $site . ', lang: ' . $lang . '.');

        return QuestionResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return QuestionResource
     *
     * @throws Exception
     */
    public function show($id): QuestionResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getContent(), $this->entity, 'showed');

        return new QuestionResource($result);
    }

    /**
     * @param array $data
     *
     * @return QuestionResource
     *
     * @throws Exception
     */
    public function create(array $data): QuestionResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getContent(), $this->entity, 'created');

        return new QuestionResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return QuestionResource
     *
     * @throws Exception
     */
    public function update($id, array $data): QuestionResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getContent(), $this->entity, 'updated');

        return new QuestionResource($result->fresh());
    }

    /**
     * @param int $id
     *
     * @return void
     *
     * @throws Exception
     */
    public function delete($id): void
    {
        $this->defineUserData();

        $model = $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($this->causer->name, $model->getContent(), $this->entity, 'deleted');
    }
}
