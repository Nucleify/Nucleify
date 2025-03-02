<?php

use App\Models\Structural\Link;

it('can be created', function () {
    $link = Link::factory()->create();

    expect($link)->toBeInstanceOf(Link::class);
});

describe('Instance', function () {
    test('can get id', function () {
        $link = Link::factory()->create();

        expect($link->getId())
            ->toBeInt()
            ->toBe($link->id);
    });

    test('can get download', function () {
        $link = Link::factory()->create();

        expect($link->getDownload())
            ->toBeString()
            ->toBe($link->download);
    });

    test('can get null for download if not set', function () {
        $link = Link::factory()->create(['download' => null]);

        expect($link->getDownload())->toBeNull();
    });

    test('can get href', function () {
        $link = Link::factory()->create();

        expect($link->getHref())
            ->toBeString()
            ->toBe($link->href);
    });

    test('can get src', function () {
        $link = Link::factory()->create();

        expect($link->getSrc())
            ->toBeString()
            ->toBe($link->src);
    });

    test('can get null for src if not set', function () {
        $link = Link::factory()->create(['src' => null]);

        expect($link->getSrc())->toBeNull();
    });

    test('can get icon', function () {
        $link = Link::factory()->create();

        expect($link->getIcon())
            ->toBeString()
            ->toBe($link->icon);
    });

    test('can get null for icon if not set', function () {
        $link = Link::factory()->create(['icon' => null]);

        expect($link->getIcon())->toBeNull();
    });

    test('can get category', function () {
        $link = Link::factory()->create();

        expect($link->getCategory())
            ->toBeString()
            ->toBe($link->category);
    });

    test('can get hreflang', function () {
        $link = Link::factory()->create();

        expect($link->getHreflang())
            ->toBeString()
            ->toBe($link->hreflang);
    });

    test('can get null for hreflang if not set', function () {
        $link = Link::factory()->create(['hreflang' => null]);

        expect($link->getHreflang())->toBeNull();
    });

    test('can get media', function () {
        $link = Link::factory()->create();

        expect($link->getMedia())
            ->toBeString()
            ->toBe($link->media);
    });

    test('can get null for media if not set', function () {
        $link = Link::factory()->create(['media' => null]);

        expect($link->getMedia())->toBeNull();
    });

    test('can get ping', function () {
        $link = Link::factory()->create();

        expect($link->getPing())
            ->toBeString()
            ->toBe($link->ping);
    });

    test('can get null for ping if not set', function () {
        $link = Link::factory()->create(['ping' => null]);

        expect($link->getPing())->toBeNull();
    });

    test('can get referrerpolicy', function () {
        $link = Link::factory()->create();

        expect($link->getReferrerPolicy())
            ->toBeString()
            ->toBe($link->referrerpolicy);
    });

    test('can get null for referrerpolicy if not set', function () {
        $link = Link::factory()->create(['referrerpolicy' => null]);

        expect($link->getReferrerPolicy())->toBeNull();
    });

    test('can get rel', function () {
        $link = Link::factory()->create();

        expect($link->getRel())
            ->toBeString()
            ->toBe($link->rel);
    });

    test('can get null for rel if not set', function () {
        $link = Link::factory()->create(['rel' => null]);

        expect($link->getRel())->toBeNull();
    });

    test('can get target', function () {
        $link = Link::factory()->create();

        expect($link->getTarget())
            ->toBeString()
            ->toBe($link->target);
    });

    test('can get null for target if not set', function () {
        $link = Link::factory()->create(['target' => null]);

        expect($link->getTarget())->toBeNull();
    });

    test('can get type', function () {
        $link = Link::factory()->create();

        expect($link->getType())
            ->toBeString()
            ->toBe($link->type);
    });

    test('can get null for type if not set', function () {
        $link = Link::factory()->create(['type' => null]);

        expect($link->getType())->toBeNull();
    });

    test('can get start_date', function () {
        $link = Link::factory()->create();

        expect($link->getStartDate())
            ->toBeString()
            ->toBe($link->start_date);
    });

    test('can get end_date', function () {
        $link = Link::factory()->create();

        expect($link->getEndDate())
            ->toBeString()
            ->toBe($link->end_date);
    });

    test('can get created_at date', function () {
        $link = Link::factory()->create();

        expect($link->getCreatedAt())
            ->toBeString()
            ->toBe($link->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $link = Link::factory()->create();

        expect($link->getUpdatedAt())
            ->toBeString()
            ->toBe($link->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetById', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getById($link->id)->first();
        expect($foundLink->id)->toBe($link->id);
    });

    test('can filter by download using scopeGetByDownload', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByDownload($link->download)->first();
        expect($foundLink->download)->toBe($link->download);
    });

    test('can filter by href using scopeGetByHref', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByHref($link->href)->first();
        expect($foundLink->href)->toBe($link->href);
    });

    test('can filter by src using scopeGetBySrc', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getBySrc($link->src)->first();
        expect($foundLink->src)->toBe($link->src);
    });

    test('can filter by icon using scopeGetByIcon', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByIcon($link->icon)->first();
        expect($foundLink->icon)->toBe($link->icon);
    });

    test('can filter by category using scopeGetByCategory', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByCategory($link->category)->first();
        expect($foundLink->category)->toBe($link->category);
    });

    test('can filter by hreflang using scopeGetByHreflang', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByHreflang($link->hreflang)->first();
        expect($foundLink->hreflang)->toBe($link->hreflang);
    });

    test('can filter by media using scopeGetByMedia', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByMedia($link->media)->first();
        expect($foundLink->media)->toBe($link->media);
    });

    test('can filter by ping using scopeGetByPing', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByPing($link->ping)->first();
        expect($foundLink->ping)->toBe($link->ping);
    });

    test('can filter by referrerpolicy using scopeGetByReferrerPolicy', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByReferrerPolicy($link->referrerpolicy)->first();
        expect($foundLink->referrerpolicy)->toBe($link->referrerpolicy);
    });

    test('can filter by rel using scopeGetByRel', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByRel($link->rel)->first();
        expect($foundLink->rel)->toBe($link->rel);
    });

    test('can filter by target using scopeGetByTarget', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByTarget($link->target)->first();
        expect($foundLink->target)->toBe($link->target);
    });

    test('can filter by type using scopeGetByType', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByType($link->type)->first();
        expect($foundLink->type)->toBe($link->type);
    });

    test('can filter by start_date using scopeGetByStartDate', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByStartDate($link->start_date)->first();
        expect($foundLink->start_date)->toBe($link->start_date);
    });

    test('can filter by end_date using scopeGetByEndDate', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByEndDate($link->end_date)->first();
        expect($foundLink->end_date)->toBe($link->end_date);
    });

    test('can filter by created_at using scopeGetByCreatedAt', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByCreatedAt($link->created_at->toDateString())->first();
        expect($foundLink->created_at->toDateString())->toBe($link->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetByUpdatedAt', function () {
        $link = Link::factory()->create();
        $foundLink = Link::getByUpdatedAt($link->updated_at->toDateString())->first();
        expect($foundLink->updated_at->toDateString())->toBe($link->updated_at->toDateString());
    });
});
