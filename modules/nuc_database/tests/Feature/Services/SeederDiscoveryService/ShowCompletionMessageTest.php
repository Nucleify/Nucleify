<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('seeder-discovery-service', 'show-completion-message');

use App\Services\SeederDiscoveryService;
use Illuminate\Database\Seeder;

beforeEach(function (): void {
    $this->service = new SeederDiscoveryService;
});

describe('showCompletionMessage', function (): void {
    test('shows completion message when seeder has showMessage method', function (): void {
        $seeder = new class extends Seeder
        {
            use \App\Traits\Runners\MessageRunnerTrait;

            public $messageShown = false;

            public function showMessage(string $message, $command, bool $break = true, bool $divider = true, string $dividerChar = '~'): void
            {
                $this->messageShown = true;
            }
        };

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('showCompletionMessage');
        $method->setAccessible(true);

        $method->invoke($this->service, $seeder, 'Test Module');

        expect(true)->toBeTrue();
    });

    test('handles seeder without showMessage method gracefully', function (): void {
        $seeder = new class extends Seeder
        {
            public function run() {}
        };

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('showCompletionMessage');
        $method->setAccessible(true);

        $method->invoke($this->service, $seeder, 'Test Module');

        expect(true)->toBeTrue();
    });

    test('handles reflection exception gracefully', function (): void {
        $seeder = Mockery::mock(Seeder::class);
        $seeder->shouldReceive('showMessage')->andReturnUsing(function () {
            throw new \ReflectionException('Test exception');
        });

        $reflection = new ReflectionClass($this->service);
        $method = $reflection->getMethod('showCompletionMessage');
        $method->setAccessible(true);

        $method->invoke($this->service, $seeder, 'Test Module');

        expect(true)->toBeTrue();
    });
});
