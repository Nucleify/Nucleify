<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Facades\ActivityLogger;

use App\Models\Contact;
use App\Transformers\ContactTransformer;

class ContactService
{
    public function __construct(private readonly Contact $model, protected string $entity = 'Contact'){}

    public function getAll(Request $request): array
    {
        $causer = auth()->user();

        // Get the URL from which the request was sent
        $referer = $request->header('referer');

        switch (true) {
            // If the URL not contains '/contacts', fetch contacts based on user role
            case $referer && !str_contains($referer, '/contacts'):
                switch (true) {
                    case $causer->isUser():
                        $contacts = $causer
                            ->contacts()
                            ->where('user_id', $causer->id)
                            ->get();

                        ActivityLogger::logMessage(
                            $causer->name . ' has fetched all his contacts'
                        );
                        break;

                    default:
                        $contacts = $this->model->all();
                        ActivityLogger::logMessage(
                            $causer->name . ' has fetched all contacts for all users'
                        );
                        break;
                }
                break;

            // Default behavior if the URL contains '/contacts'
            default:
                $contacts = $causer
                    ->contacts()
                    ->where('user_id', $causer->id)
                    ->get();

                ActivityLogger::logMessage(
                    $causer->name . ' has fetched all his contacts'
                );
                break;
        }

        return fractal()
            ->collection($contacts)
            ->transformWith(new ContactTransformer())
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
                    ->contacts()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        ActivityLogger::log($causer, $model, $this->entity, 'showed');


        return fractal()
            ->item($model)
            ->transformWith(new ContactTransformer())
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $causer = auth()->user();

        $model = $this->model::create($data);
        ActivityLogger::log($causer, $model, $this->entity, 'created');

        return fractal()
            ->item($model)
            ->transformWith(new ContactTransformer())
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
                    ->contacts()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        $model->update($data);
        ActivityLogger::log($causer, $model, $this->entity, 'updated');

        return fractal()
            ->item($model->fresh())
            ->transformWith(new ContactTransformer())
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
                    ->contacts()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                break;
        }

        $model->delete();
        ActivityLogger::log($causer, $model, $this->entity, 'deleted');
    }
}
