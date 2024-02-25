<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Contracts\ContactShouldReceiveFields;


class ContactTransformer extends TransformerAbstract
{
    public function transform(ContactShouldReceiveFields $model): array
    {
        return [
            'id' => $model->getId(),
            'user_id' => $model->getUserId(),
            'first_name' => $model->getFirstName(),
            'last_name' => $model->getLastName(),
            'full_name' => $model->getFullName(),
            'email' => $model->getEmail(),
            'personal_phone' => $model->getPersonalPhone(),
            'work_phone' => $model->getWorkPhone(),
            'address' => $model->getAddress(),
            'birthday' => $model->getBirthday(),
            'role' => $model->getRole(),
            'contact_groups' => $model->getContactGroups(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt()
        ];
    }
}
