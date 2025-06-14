<?php

namespace App\Services;

use App\Models\Module;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\ModuleTransformer;
use Illuminate\Http\Request;

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

    public function index(Request $request): mixed
    {
        $this->defineRequestData($request);
        $this->defineUserData();

        $result = $this->model->all();

        $this->logger->logIndex($this->causer->name, $this->entity, $this->isRefererStructural);

        return fractal()
            ->collection($result)
            ->transformWith(new ModuleTransformer)
            ->toArray()['data'];
    }

    public function show($id): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new ModuleTransformer)
            ->toArray()['data'];
    }

    public function create(array $data): array
    {
        $this->defineUserData();

        $result = $this->model::create($data);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'created');

        return fractal()
            ->item($result)
            ->transformWith(new ModuleTransformer)
            ->toArray()['data'];
    }

    public function update($id, array $data): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->update($data);

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'updated');

        return fractal()
            ->item($result->fresh())
            ->transformWith(new ModuleTransformer)
            ->toArray()['data'];
    }

    public function delete($id): void
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->delete();

        $this->logger->log($this->causer->name, $result->getName(), $this->entity, 'deleted');
    }
}
