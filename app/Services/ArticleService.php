<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;

use App\Models\Article;
use App\Transformers\ArticleTransformer;

class ArticleService
{
    public function __construct(private readonly Article $model){}

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

                        activity()
                            ->log(
                                '"' . $causer->name . '" has fetched all his articles'
                            );
                        break;

                    default:
                        $articles = $this->model->all();
                        activity()
                            ->log(
                                '"' . $causer->name . '" has fetched all articles for all users'
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

                activity()
                    ->log(
                        '"' . $causer->name . '" has fetched all his articles'
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
                $targetUser = User::findOrFail($model->user_id);

                $logMessage = $causer->id === $targetUser->id ?
                    '"'. $causer->name. '" has fetched his article: "'. $model->title .'"' :
                    '"' . $causer->name . '" has fetched article: "' . $model->title . ' of: ' . '"' . $targetUser->name . '"' . ' user';

                activity()->log($logMessage);
                break;

            default:
                $model = $causer
                    ->articles()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);

                activity()
                    ->log(
                        '"'. $causer->name. '" has fetched his article: "'. $model->title .'"'
                    );
                break;
        }

        return fractal()
            ->item($model)
            ->transformWith(new ArticleTransformer())
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $model = $this->model::create($data);
        $causer = auth()->user();

        activity()
            ->log(
                '"'. $causer->name. '" has created article: "'. $model->title .'"'
            );

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
                $model->update($data);
                $targetUser = User::findOrFail($model->user_id);

                $logMessage = $causer->id === $targetUser->id ?
                    '"'. $causer->name. '" has updated his article: "'. $model->title .'"' :
                    '"'. $causer->name . '" has updated article: "' . $model->title . ' of: ' . '"' . $targetUser->name . '"' . ' user';

                activity()->log($logMessage);
                break;

            default:
                $model = $causer
                    ->articles()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                $model->update($data);

                activity()
                    ->log(
                        '"'. $causer->name. '" has updated his article: "'. $model->title .'"'
                    );
                break;
        }

        $model->update($data);

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
                $targetUser = User::findOrFail($model->user_id);

                $logMessage = $causer->id === $targetUser->id ?
                    '"'. $causer->name. '" has deleted his article: "'. $model->title .'"' :
                    '"' . $causer->name . '" has deleted article: "' . $model->title . ' of: ' . '"' . $targetUser->name . '"' . ' user';

                $model->delete();
                activity()->log($logMessage);
                break;

            default:
                $model = $causer
                    ->articles()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);

                $model->delete();

                activity()
                    ->log(
                        '"'. $causer->name. '" has deleted his article: "'. $model->title .'"'
                    );
                break;
        }
    }
}
