<?php

namespace App\Services;

use App\Models\Contact;
use App\Transformers\ContactTransformer;

class ContactService
{
    public function __construct(private readonly Contact $model){}

    public function getAllContacts()
    {
        $model = $this->model->all();

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has fetched all contacts data.'
            );

        return fractal()
            ->collection($model)
            ->transformWith(new ContactTransformer())
            ->toArray()['data'];
    }

    public function getContactById($id): array
    {
        $model = $this->model::findOrFail($id);

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has fetched contact: "'. $model->first_name .' '. $model->last_name
            );

        return fractal()
            ->item($model)
            ->transformWith(new ContactTransformer())
            ->toArray()['data'];
    }

    public function createContact(array $data): array
    {
        $model = $this->model::create($data);

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has created contact: "'. $model->first_name .' '. $model->last_name
            );

        return fractal()
            ->item($model)
            ->transformWith(new ContactTransformer())
            ->toArray()['data'];
    }

    public function updateContact($id, array $data): array
    {
        $model = $this->model::findOrFail($id);

        $model->update($data);

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has updated contact: "'. $model->first_name .' '. $model->last_name
            );

        return fractal()
            ->item($model->fresh())
            ->transformWith(new ContactTransformer())
            ->toArray()['data'];
    }

    public function deleteContact($id): void
    {
        $model = $this->model::findOrFail($id);

        $model->delete();

        activity()
            ->causedBy(auth()->user())
            ->log(
                'User:  "'. auth()->user()->name. '" has deleted contact: "'. $model->first_name .' '. $model->last_name
            );
    }
}
