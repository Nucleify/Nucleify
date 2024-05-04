<?php

namespace App\Services;

use App\Models\Article;
use App\Transformers\ArticleTransformer;

class ArticleService
{
    public function __construct(private readonly Article $model){}

    public function getAll()
    {
        $model = $this->model->all();

        return fractal()
            ->collection($model)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function getById($id): array
    {
        $model = $this->model::query()->findOrFail($id);

        return fractal()
            ->item($model)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $model = $this->model::query()->create($data);

        return fractal()
            ->item($model)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function update($id, array $data): array
    {
        $model = $this->model::query()->findOrFail($id);

        $model->update($data);

        return fractal()
            ->item($model->fresh())
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function delete($id): void
    {
        $model = $this->model::query()->findOrFail($id);

        $model->delete();
    }
}
