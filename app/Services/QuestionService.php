<?php

namespace App\Services;

use Illuminate\Http\Request;

use App\Models\Question;
use App\Transformers\QuestionTransformer;

class QuestionService 
{
  /**
   * @param Question $model
   * @param string $entity
   * @param ActivityLoggerService $logger
   */
  public function __construct(
    private readonly Question $model,
    protected string $entity = 'question',
    private readonly ActivityLoggerService $logger = new ActivityLoggerService()
  ) {}

  /**
   * @param Request $request
   * 
   * @return mixed
   */
  public function index(Request $request): mixed
  {
    $causer = auth()->user();
    $referer = $request->header('referer');
    $isRefererAdmin = $referer && !str_contains($referer, '/questions');

    $questions = $isRefererAdmin
      ? ($causer->isUser()
        ? $this->model->where('user_id', $causer->id)->get()
        : $this->model->all())
      : $this->model->where('user_id', $causer->id)->get();

    $this->logger->logIndex($causer->name, $this->entity, $isRefererAdmin);

    return fractal()
      ->collection($questions)
      ->transformWith(new QuestionTransformer())
      ->toArray()['data'];
  }

  /**
   * @param Request $request
   * 
   * @return array
   */
  public function countByCreatedLastWeek(Request $request): array
  {
    $causer = auth()->user();
    $referer = $request->header('referer');
    $lastWeek = now()->subWeek()->toDateString();
    $isRefererAdmin = $referer && !str_contains($referer, '/questions');

    $count = $this->model
      ->when(!$causer->isUser() || $isRefererAdmin, fn($query) => $query)
      ->where('user_id', $causer->id)
      ->whereDate('created_at', '>=', $lastWeek)
      ->count();

    $this->logger->logCountByCreatedLastWeek($causer->name, $this->entity, $isRefererAdmin);

    return ['count' => $count];
  }

  /**
   * @param $id
   * 
   * @return array
   */
  public function show($id): array
  {
    $causer = auth()->user();

    $model = $causer->isUser()
      ? $this->model->where('user_id', $causer->id)->findOrFail($id)
      : $this->model::findOrFail($id);

    $this->logger->log($causer->name, $model->content, $this->entity, 'showed');

    return fractal()
      ->item($model)
      ->transformWith(new QuestionTransformer())
      ->toArray()['data'];
  }

  /**
   * @param array $data
   * 
   * @return array
   */
  public function create(array $data): array
  {
    $causer = auth()->user();

    $model = $this->model::create($data);

    $this->logger->log($causer->name, $model->content, $this->entity, 'created');

    return fractal()
      ->item($model)
      ->transformWith(new QuestionTransformer())
      ->toArray()['data'];
  }
  
  /**
   * @param $id
   * @param array $data
   * 
   * @return array
   */
  public function update($id, array $data): array
  {
    $causer = auth()->user();

    $model = $causer->isUser()
      ? $this->model->where('user_id', $causer->id)->findOrFail($id)
      : $this->model::findOrFail($id);

    $model->update($data);

    $this->logger->log($causer->name, $model->content, $this->entity, 'updated');

    return fractal()->item($model->fresh())
      ->transformWith(new QuestionTransformer())
      ->toArray()['data'];
  }

  /**
   * @param $id
   * 
   * @return void
   */
  public function delete($id): void
  {
    $causer = auth()->user();

    $model = $causer->isUser()
      ? $this->model->where('user_id', $causer->id)->findOrFail($id)
      : $this->model::findOrFail($id);

    $model->delete();

    $this->logger->log($causer->name, $model->content, $this->entity, 'deleted');
  }
}