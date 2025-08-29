<?php

namespace App\Services;

use App\Models\File;
use App\Resources\FileResource;
use App\Traits\Setters\RequestSetterTrait;
use App\Traits\Setters\TimeSetterTrait;
use App\Traits\Setters\UserSetterTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FileService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly File $model,
        protected string $entity = 'file',
        private readonly LoggerService $logger = new LoggerService,
        private readonly UploadService $uploadService = new UploadService
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

        return FileResource::collection($result);
    }

    /**
     * @param int $id
     *
     * @return FileResource
     *
     * @throws Exception
     */
    public function show($id): FileResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);

        $this->logger->log($this->causer->name, $result->getId(), $this->entity, 'showed');

        return new FileResource($result);
    }

    /**
     * @param int $id
     * @param string $data
     *
     * @return FileResource
     *
     * @throws Exception
     */
    public function edit($id, string $data): FileResource
    {
        $this->defineUserData();

        $result = $this->model::findOrFail($id);
        $oldFullPath = $result->getPath();

        $directory = dirname($oldFullPath);
        $newFullPath = $directory . '/' . $data;

        $this->uploadService->edit($oldFullPath, $newFullPath);

        $result->path = $newFullPath;
        $result->save();

        $this->logger->log($this->causer->name, $result->getId(), $this->entity, 'edited');

        return new FileResource($result);
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

        $this->logger->log($this->causer->name, $result->getId(), $this->entity, 'deleted');
    }
}
