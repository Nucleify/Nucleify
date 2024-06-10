<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Facades\ActivityLogger;

use App\Models\Article;
use App\Transformers\ArticleTransformer;

class ArticleService
{
    public function __construct(private readonly Article $model, protected string $entity = 'Article'){}

    public function getAll(Request $request)
    {
        $causer = auth()->user();

        // Get the URL from which the request was sent
        $referer = $request->header('referer');

        switch (true) {
            // If the URL not contains '/articles', fetch contacts based on user role
            case $referer && !str_contains($referer, '/articles'):
                switch (true) {
                    case $causer->isUser():
                        $articles = $causer
                            ->articles()
                            ->where('user_id', $causer->id)
                            ->get();

                        ActivityLogger::logMessage(
                            $causer->name . ' has fetched all his articles'
                        );
                        break;

                    default:
                        $articles = $this->model->all();
                        ActivityLogger::logMessage(
                            $causer->name . ' has fetched all articles for all users'
                        );
                        break;
                }
                break;

            // Default behavior if the URL contains '/articles'
            default:
                $articles = $causer
                    ->articles()
                    ->where('user_id', $causer->id)
                    ->get();

                ActivityLogger::logMessage(
                    $causer->name . ' has fetched all his articles'
                );
                break;
        }

        return fractal()
            ->collection($articles)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function getById($id): array
    {
        $causer = auth()->user();

        switch (true) {
            case !$causer->isUser():
                $model = $this->model::findOrFail($id);
                break;

            default:
                $model = $causer
                    ->articles()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        ActivityLogger::log($causer, $model, $this->entity, 'showed');

        return fractal()
            ->item($model)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $causer = auth()->user();

        $model = $this->model::create($data);
        ActivityLogger::log($causer, $model, $this->entity, 'created');

        return fractal()
            ->item($model)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function update($id, array $data): array
    {
        $causer = auth()->user();

        switch (true) {
            case !$causer->isUser():
                $model = $this->model::findOrFail($id);
                break;

            default:
                $model = $causer
                    ->articles()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        $model->update($data);
        ActivityLogger::log($causer, $model, $this->entity, 'updated');

        return fractal()
            ->item($model->fresh())
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function delete($id): void
    {
        $causer = auth()->user();

        switch (true) {
            case !$causer->isUser():
                $model = $this->model::findOrFail($id);
                break;

            default:
                $model = $causer
                    ->articles()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        $model->delete();
        ActivityLogger::log($causer, $model, $this->entity, 'deleted');
    }
}
