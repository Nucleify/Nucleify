<?php

use App\Traits\Getters\TimeGetterTrait;

beforeEach(function (): void {
    $this->trait = new class
    {
        use TimeGetterTrait;
    };
});

describe('TimeGetterTrait', function (): void {
    test('getLastWeek returns date from 7 days ago', function (): void {
        $expectedDate = now()->subWeek()->toDateString();

        expect($this->trait->getLastWeek())->toBe($expectedDate);
    });

    test('getLastWeek date format is correct', function (): void {
        $lastWeek = $this->trait->getLastWeek();

        expect(preg_match('/\d{4}-\d{2}-\d{2}/', $lastWeek))->toBe(1);
    });
});
