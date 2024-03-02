<?php

namespace App\Services;

use App\Models\Contact;
use App\Models\User;
use App\Transformers\ContactTransformer;

class ContactService
{
    public function __construct(private readonly Contact $model){}

    public function getAll(): array
    {
        $causer = auth()->user();
        $contacts = [];

        switch (true) {
            case $causer->isUser():
                $contacts = $causer
                    ->contacts()
                    ->where('user_id', $causer->id)
                    ->get();

                activity()
                    ->log(
                        '"'. $causer->name. '" has fetched all his contacts'
                    );
                break;

            case !$causer->isUser():
                $contacts = $this->model->all();
                activity()
                    ->log(
                        '"'. $causer->name. '" has fetched all contacts for all users'
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
                $targetUser = User::findOrFail($model->user_id);

                $logMessage = $causer->id === $targetUser->id ?
                    '"'. $causer->name. '" has fetched his contact: "'. $model->first_name .' '. $model->last_name .'"' :
                    '"' . $causer->name . '" has fetched contact: "' . $model->first_name . ' ' . $model->last_name . ' of: ' . '"' . $targetUser->name . '"' . ' user';

                activity()->log($logMessage);
                break;

            default:
                $model = $causer
                    ->contacts()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);

                activity()
                    ->log(
                        '"'. $causer->name. '" has fetched his contact: "'. $model->first_name .' '. $model->last_name .'"'
                    );
                break;
        }

        return fractal()
            ->item($model)
            ->transformWith(new ContactTransformer())
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $model = $this->model::create($data);
        $causer = auth()->user();

        activity()
            ->log(
                '"'. $causer->name. '" has created contact: "'. $model->first_name .' '. $model->last_name .'"'
            );

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
                $model->update($data);
                $targetUser = User::findOrFail($model->user_id);

                $logMessage = $causer->id === $targetUser->id ?
                    '"'. $causer->name. '" has updated his contact: "'. $model->first_name .' '. $model->last_name .'"' :
                    '"'. $causer->name . '" has updated contact: "' . $model->first_name . ' ' . $model->last_name . ' of: ' . '"' . $targetUser->name . '"' . ' user';

                activity()->log($logMessage);
                break;

            default:
                $model = $causer
                    ->contacts()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);
                $model->update($data);

                activity()
                    ->log(
                        '"'. $causer->name. '" has updated his contact: "'. $model->first_name .' '. $model->last_name .'"'
                    );
                break;
        }

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
                $targetUser = User::findOrFail($model->user_id);

                $logMessage = $causer->id === $targetUser->id ?
                    '"'. $causer->name. '" has deleted his contact: "'. $model->first_name .' '. $model->last_name .'"' :
                    '"' . $causer->name . '" has deleted contact: "' . $model->first_name . ' ' . $model->last_name . ' of: ' . '"' . $targetUser->name . '"' . ' user';

                $model->delete();
                activity()->log($logMessage);
                break;

            default:
                $model = $causer
                    ->contacts()
                    ->where('user_id', $causer->id)
                    ->findOrFail($id);

                $model->delete();

                activity()
                    ->log(
                        '"'. $causer->name. '" has deleted his contact: "'. $model->first_name .' '. $model->last_name .'"'
                    );
                break;
        }
    }
}
