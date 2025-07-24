<?php

namespace App\Services;

use App\Models\File;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use App\Transformers\FileTransformer;
use Illuminate\Http\Request;

class FileService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly File $model,
        protected string $entity = 'file',
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
            ->transformWith(new FileTransformer)
            ->toArray()['data'];
    }

    public function show($id): array
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getId(), $this->entity, 'showed');

        return fractal()
            ->item($result)
            ->transformWith(new FileTransformer)
            ->toArray()['data'];
    }

    public function delete($id): void
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $result->delete();

        $this->logger->log($this->causer->name, $result->getId(), $this->entity, 'deleted');
    }
}
