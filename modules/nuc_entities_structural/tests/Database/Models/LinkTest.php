<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('link-model');

use App\Models\Link;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = Link::factory()->create();
});

test('can be created', function (): void {
    expect($this->model)->toBeInstanceOf(Link::class);
});

describe('Instance', function (): void {
    test('can get id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('can get download', function (): void {
        expect($this->model->getDownload())
            ->toBeString()
            ->toBe($this->model->download);
    });

    test('can get href', function (): void {
        expect($this->model->getHref())
            ->toBeString()
            ->toBe($this->model->href);
    });

    test('can get src', function (): void {
        expect($this->model->getSrc())
            ->toBeString()
            ->toBe($this->model->src);
    });

    test('can get icon', function (): void {
        expect($this->model->getIcon())
            ->toBeString()
            ->toBe($this->model->icon);
    });

    test('can get category', function (): void {
        expect($this->model->getCategory())
            ->toBeString()
            ->toBe($this->model->category);
    });

    test('can get hreflang', function (): void {
        expect($this->model->getHreflang())
            ->toBeString()
            ->toBe($this->model->hreflang);
    });

    test('can get media', function (): void {
        expect($this->model->getMedia())
            ->toBeString()
            ->toBe($this->model->media);
    });

    test('can get ping', function (): void {
        expect($this->model->getPing())
            ->toBeString()
            ->toBe($this->model->ping);
    });

    test('can get referrerpolicy', function (): void {
        expect($this->model->getReferrerPolicy())
            ->toBeString()
            ->toBe($this->model->referrerpolicy);
    });

    test('can get rel', function (): void {
        expect($this->model->getRel())
            ->toBeString()
            ->toBe($this->model->rel);
    });

    test('can get target', function (): void {
        expect($this->model->getTarget())
            ->toBeString()
            ->toBe($this->model->target);
    });

    test('can get type', function (): void {
        expect($this->model->getType())
            ->toBeString()
            ->toBe($this->model->type);
    });

    test('can get created_at date', function (): void {
        expect($this->model->getCreatedAt())
            ->toBeString()
            ->toBe($this->model->created_at->toDateTimeString());
    });

    test('can get updated_at date', function (): void {
        expect($this->model->getUpdatedAt())
            ->toBeString()
            ->toBe($this->model->updated_at->toDateTimeString());
    });
});

describe('Scope', function (): void {
    test('can filter by id using scopeGetById', function (): void {
        $foundModel = Link::getById($this->model->id)->first();

        expect($foundModel->id)->toBe($this->model->id);
    });

    test('can filter by download using scopeGetByDownload', function (): void {
        $foundModel = Link::getByDownload($this->model->download)->first();

        expect($foundModel->download)->toBe($this->model->download);
    });

    test('can filter by href using scopeGetByHref', function (): void {
        $foundModel = Link::getByHref($this->model->href)->first();

        expect($foundModel->href)->toBe($this->model->href);
    });

    test('can filter by src using scopeGetBySrc', function (): void {
        $foundModel = Link::getBySrc($this->model->src)->first();

        expect($foundModel->src)->toBe($this->model->src);
    });

    test('can filter by icon using scopeGetByIcon', function (): void {
        $foundModel = Link::getByIcon($this->model->icon)->first();

        expect($foundModel->icon)->toBe($this->model->icon);
    });

    test('can filter by category using scopeGetByCategory', function (): void {
        $foundModel = Link::getByCategory($this->model->category)->first();

        expect($foundModel->category)->toBe($this->model->category);
    });

    test('can filter by hreflang using scopeGetByHreflang', function (): void {
        $foundModel = Link::getByHreflang($this->model->hreflang)->first();

        expect($foundModel->hreflang)->toBe($this->model->hreflang);
    });

    test('can filter by media using scopeGetByMedia', function (): void {
        $foundModel = Link::getByMedia($this->model->media)->first();

        expect($foundModel->media)->toBe($this->model->media);
    });

    test('can filter by ping using scopeGetByPing', function (): void {
        $foundModel = Link::getByPing($this->model->ping)->first();

        expect($foundModel->ping)->toBe($this->model->ping);
    });

    test('can filter by referrerpolicy using scopeGetByReferrerPolicy', function (): void {
        $foundModel = Link::getByReferrerPolicy($this->model->referrerpolicy)->first();

        expect($foundModel->referrerpolicy)->toBe($this->model->referrerpolicy);
    });

    test('can filter by rel using scopeGetByRel', function (): void {
        $foundModel = Link::getByRel($this->model->rel)->first();

        expect($foundModel->rel)->toBe($this->model->rel);
    });

    test('can filter by target using scopeGetByTarget', function (): void {
        $foundModel = Link::getByTarget($this->model->target)->first();

        expect($foundModel->target)->toBe($this->model->target);
    });

    test('can filter by type using scopeGetByType', function (): void {
        $foundModel = Link::getByType($this->model->type)->first();

        expect($foundModel->type)->toBe($this->model->type);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function (): void {
        $foundModel = Link::getByCreatedAt($this->model->created_at->toDateString())->first();

        expect($foundModel->created_at->toDateString())->toBe($this->model->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function (): void {
        $foundModel = Link::getByUpdatedAt($this->model->updated_at->toDateString())->first();

        expect($foundModel->updated_at->toDateString())->toBe($this->model->updated_at->toDateString());
    });
});
