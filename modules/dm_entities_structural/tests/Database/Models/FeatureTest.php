<?php if (!defined('PEST_RUNNING')) return; 


use App\Models\Feature;

beforeEach(function () {
    $this->createUsers();
    $this->model = Feature::factory()->create();
});

it('can be created', function () {
    expect($this->model)->toBeInstanceOf(Feature::class);
});

describe('Instance', function () {
    test('can get id', function () {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get icon', function () {
        expect($this->model->getIcon())
            ->toBeString()
            ->toBe($this->model->icon);
    });

    test('can get header', function () {
        expect($this->model->getHeader())
            ->toBeString()
            ->toBe($this->model->header);
    });

    test('can get description', function () {
        expect($this->model->getDescription())
            ->toBeString()
            ->toBe($this->model->description);
    });

    test('can get category', function () {
        expect($this->model->getCategory())
            ->toBeString()
            ->toBe($this->model->category);
    });

    test('can get created_at date', function () {
        expect($this->model->getCreatedAt())
            ->toBeString()
            ->toBe($this->model->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        expect($this->model->getUpdatedAt())
            ->toBeString()
            ->toBe($this->model->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetById', function () {
        $foundModel = Feature::getById($this->model->id)->first();
        
        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter icon using scopeGetByIcon', function () {
        $foundModel = Feature::getByIcon($this->model->icon)->first();

        expect($foundModel->icon)->toBe($this->model->icon);
    });

    test('can filter header using scopeGetByHeader', function () {
        $foundModel = Feature::getByHeader($this->model->header)->first();

        expect($foundModel->header)->toBe($this->model->header);
    });

    test('can filter description using scopeGetByDescription', function () {
        $foundModel = Feature::getByDescription($this->model->description)->first();

        expect($foundModel->description)->toBe($this->model->description);
    });

    test('can filter by category using scopeGetByCategory', function () {
        $foundModel = Feature::getByCategory($this->model->category)->first();

        expect($foundModel->category)->toBe($this->model->category);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function () {
        $foundModel = Feature::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function () {
        $foundModel = Feature::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
