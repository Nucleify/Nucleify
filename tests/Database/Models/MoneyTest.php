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

    test('can get created_at date', function () {
        $money = Money::factory()->create();

        expect($money->getCreatedAt()->format('Y-m-d H:i:s'))
            ->toBeString()
            ->toBe($money->created_at->toDateTimeString());
    });

    test('can get updated_at date', function () {
        $money = Money::factory()->create();

        expect($money->getUpdatedAt()->format('Y-m-d H:i:s'))
            ->toBeString()
            ->toBe($money->updated_at->toDateTimeString());
    });
});
