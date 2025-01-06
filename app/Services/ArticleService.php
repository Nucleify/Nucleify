<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Models\Article;
use App\Transformers\ArticleTransformer;

class ArticleService
{
    /**
     * @param Article $model
     * @param string $entity
     * @param ActivityLoggerService $logger
     */
    public function __construct(
        private readonly Article $model,
        protected string $entity = 'article',
        private readonly ActivityLoggerService $logger = new ActivityLoggerService()
    ) {}

    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function getAll(Request $request): mixed
    {
        $causer = auth()->user();

        $referer = $request->header('referer');

        $articles = $referer && !str_contains($referer, '/articles')
            ? ($causer->isUser()
                ? $this->model->where('user_id', $causer->id)->get()
                : $this->model->all())
            : $this->model->where('user_id', $causer->id)->get();

        $this->logger->logIndex($causer->name, $this->entity, $referer && !str_contains($referer, '/articles'));

        return fractal()
            ->collection($articles)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    /**
     * @param $id
     *
     * @return array
     */
    public function getById($id): array
    {
        $causer = auth()->user();

        $model = $causer->isUser()
            ? $this->model->where('user_id', $causer->id)->findOrFail($id)
            : $this->model::findOrFail($id);

        $this->logger->log($causer->name, $model->title, $this->entity, 'showed');

        return fractal()
            ->item($model)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    /**
     * @param array $data
     *
     * @return array
     */
    public function create(array $data): array
    {
        $causer = auth()->user();

        $model = $this->model::create($data);

        $this->logger->log($causer->name, $model->title, $this->entity, 'created');

        return fractal()
            ->item($model)
            ->transformWith(new ArticleTransformer())
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
        $causer = auth()->user();

        $model = $causer->isUser()
            ? $this->model->where('user_id', $causer->id)->findOrFail($id)
            : $this->model::findOrFail($id);

        $model->update($data);

        $this->logger->log($causer->name, $model->title, $this->entity, 'updated');

        return fractal()->item($model->fresh())
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
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
            ? $this->model->where('user_id', $causer->id)->findOrFail($id)
            : $this->model::findOrFail($id);

        $model->delete();

        $this->logger->log($causer->name, $model->title, $this->entity, 'deleted');
    }
}
