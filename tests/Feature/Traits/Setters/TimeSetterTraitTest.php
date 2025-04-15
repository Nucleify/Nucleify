<?php

use App\Traits\Setters\TimeSetterTrait;

beforeEach(function (): void {
    $this->trait = new class
    {
        use TimeSetterTrait;

        public function getLastWeekValue(): string
        {
            return $this->lastWeek;
        }
    };
});

describe('TimeSetterTrait', function (): void {
    test('defineTimeData sets lastWeek correctly', function (): void {
        $expectedDate = now()->subWeek()->toDateString();

        $this->trait->defineTimeData();

        expect($this->trait->getLastWeekValue())->toBe($expectedDate);
    });

    test('lastWeek date format is correct', function (): void {
        $this->trait->defineTimeData();

        expect(preg_match('/^\d{4}-\d{2}-\d{2}$/', $this->trait->getLastWeekValue()))->toBe(1);
    });
});
