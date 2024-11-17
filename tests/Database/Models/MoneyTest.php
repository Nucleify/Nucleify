<?php

use App\Models\Money;

beforeEach(function () {
    $this->createUsers();
});

it('can be created', function () {
    $money = Money::factory()->create();

    expect($money)->toBeInstanceOf(Money::class);
});

describe('Instance', function () {
    test('can get id', function () {
        $money = Money::factory()->create();

        expect($money->getId())
            ->toBeInt()
            ->toBe($money->id);
    });

    test('can get count', function () {
        $money = Money::factory()->create();

        expect($money->getCount())
            ->toBeInt()
            ->toBe($money->count);
    });

    test('can get sender id', function () {
        $money = Money::factory()->create();

        expect($money->getSenderId())
            ->toBeInt()
            ->toBe($money->sender_id);
    });

    test('can get receiver id', function () {
        $money = Money::factory()->create();

        expect($money->getReceiverId())
            ->toBeInt()
            ->toBe($money->receiver_id);
    });

    test('can get title', function () {
        $money = Money::factory()->create();

        expect($money->getTitle())
            ->toBeString()
            ->toBe($money->title);
    });

    test('can get description', function () {
        $money = Money::factory()->create();

        expect($money->getDescription())
            ->toBeString()
            ->toBe($money->description);
    });

    test('can get category', function () {
        $money = Money::factory()->create();

        expect($money->getCategory())
            ->toBeString()
            ->toBe($money->category);
    });

    test('can get created_at date', function () {
        $money = Money::factory()->create();

        expect($money->getCreatedAt())
            ->toBeString()
            ->toBe($money->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $money = Money::factory()->create();

        expect($money->getUpdatedAt())
            ->toBeString()
            ->toBe($money->updated_at->toDateTimeString());
    });
});

describe('Scope', function () {
    test('can filter by id using scopeGetId', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getById($money->id)->first();

        expect($foundMoney->id)->toBe($money->id);
    });

    test('can filter by count using scopeGetCount', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getByCount($money->count)->first();

        expect($foundMoney->count)->toBe($money->count);
    });

    test('can filter by sender_id using scopeGetSenderId', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getBySenderId($money->sender_id)->first();

        expect($foundMoney->sender_id)->toBe($money->sender_id);
    });

    test('can filter by receiver_id using scopeReceiverId', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getByReceiverId($money->receiver_id)->first();

        expect($foundMoney->receiver_id)->toBe($money->receiver_id);
    });

    test('can filter by title using scopeGetTitle', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getByTitle($money->title)->first();

        expect($foundMoney->title)->toBe($money->title);
    });

    test('can filter by description using scopeGetDescription', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getByDescription($money->description)->first();

        expect($foundMoney->description)->toBe($money->description);
    });

    test('can filter by category using scopeGetCategory', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getByCategory($money->category)->first();

        expect($foundMoney->category)->toBe($money->category);
    });

    test('can filter by created_at using scopeGetCreatedAt', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getByCreatedAt($money->created_at->toDateString())->first();

        expect($foundMoney->created_at->toDateString())->toBe($money->created_at->toDateString());
    });

    test('can filter by updated_at using scopeGetUpdatedAt', function () {
        $money = Money::factory()->create();

        $foundMoney = Money::getByUpdatedAt($money->updated_at->toDateString())->first();

        expect($foundMoney->updated_at->toDateString())->toBe($money->updated_at->toDateString());
    });
});
