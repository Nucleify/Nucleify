<?php

use App\Traits\Getters\RequestGetterTrait;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->guest = null;

    $this->trait = new class
    {
        use RequestGetterTrait;
    };

    $this->appUrl = config('app.url');
});

describe('RequestGetterTrait', function (): void {
    test('getReferrer handles referer', function (): void {
        $request = new Request;
        $request->headers->set('referer-slug', "$this->appUrl");

        expect($this->trait->getReferrer($request))->toBe("$this->appUrl");
    });

    test('admin user accessing admin URL', function (): void {
        $this->actingAs($this->admin);

        $request = new Request;
        $request->headers->set('referer-slug', "$this->appUrl/admin");

        expect($this->trait->getReferrer($request))->toBe("$this->appUrl/admin")
            ->and($this->trait->getRefererIsAdmin("$this->appUrl/admin"))->toBeTrue();
    });

    test('no referer header provided', function (): void {
        $request = new Request;

        expect($this->trait->getReferrer($request))->toBeNull()
            ->and($this->trait->getRefererIsAdmin(null))->toBeFalse();
    });
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');
