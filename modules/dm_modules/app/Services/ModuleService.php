<?php

namespace App\Services;

use App\Models\Module;
use App\Resources\ModuleResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ModuleService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Module $model,
        protected string $entity = 'module',
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

        return ModuleResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return ModuleResource
     *
     * @throws Exception
     */
    public function show($id): ModuleResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'showed');

        return new ModuleResource($result);
    }

    /**
     * @param array $data
     *
     * @return ModuleResource
     *
     * @throws Exception
     */
    public function create(array $data): ModuleResource
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'created');

        return new ModuleResource($result);
    }

    /**
     * @param int $id
     * @param array $data
     *
     * @return ModuleResource
     *
     * @throws Exception
     */
    public function update($id, array $data): ModuleResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'updated');

        return new ModuleResource($result->fresh());
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

        $result = $this->model::findOrFail($id);

        $result->delete();

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'deleted');
    }
}
