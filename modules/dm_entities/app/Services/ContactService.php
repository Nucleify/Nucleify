<?php

namespace App\Services;

use App\Models\Contact;
use App\Resources\ContactResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ContactService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Contact $model,
        protected string $entity = 'contact',
        private readonly LoggerService $logger = new LoggerService
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->isCauserStaff && $this->isRefererAdmin
            ? $this->model->all()
            : $this->model->where('user_id', $this->causer->id)->get();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererAdmin);

        return ContactResource::collection($result);
    }

    public function countByCreatedLastWeek(Request $request): int
    {
        $this->defineRequestData($request);
        $this->defineTimeData();
        $this->defineUserData();

        $result = $this->isCauserStaff && $this->isRefererAdmin
            ? $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->count()
            : $this->model->whereDate('created_at', '>=', $this->lastWeek)
                ->where('user_id', $this->causer->id)
                ->count();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererAdmin);

        return $result;
    }

    public function show($id): ContactResource
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $this->logger->log($this->causer->name, $result->getFullName(), $this->entity, 'showed');

        return new ContactResource($result);
    }

    public function create(array $data): ContactResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getFullName(), $this->entity, 'created');

        return new ContactResource($result);
    }

    public function update($id, array $data): ContactResource
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getFullName(), $this->entity, 'updated');

        return new ContactResource($result->fresh());
    }

    public function delete($id): void
    {
        $this->defineUserData();

        $result = $this->isCauserStaff
            ? $this->model::findOrFail($id)
            : $this->model->where('user_id', $this->causer->id)->findOrFail($id);

        $result->delete();

        $this->logger->log($this->causer->name, $result->getFullName(), $this->entity, 'deleted');
    }
}
