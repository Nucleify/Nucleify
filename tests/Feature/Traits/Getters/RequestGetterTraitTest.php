<?php

use Illuminate\Http\Request;
use App\Traits\Getters\RequestGetterTrait;

beforeEach(function () {
    $this->createUsers();
    $this->guest = null;

    $this->trait = new class {
        use RequestGetterTrait;
    };

    $this->appUrl = config('app.url');
});

describe('RequestGetterTrait', function () {
    test('getReferrer handles referer', function () {
        $request = new Request();
        $request->headers->set('referer', "$this->appUrl");

        expect($this->trait->getReferrer($request))->toBe("$this->appUrl");
    });

    test('admin user accessing admin URL', function () {
        $this->actingAs($this->admin);

        $request = new Request();
        $request->headers->set('referer', "$this->appUrl/admin");

        expect($this->trait->getReferrer($request))->toBe("$this->appUrl/admin");
        expect($this->trait->getRefererIsAdmin("$this->appUrl/admin"))->toBeTrue();
    });

    test('no referer header provided', function () {
        $request = new Request();

        expect($this->trait->getReferrer($request))->toBeNull();
        expect($this->trait->getRefererIsAdmin(null))->toBeFalse();
    });
});
