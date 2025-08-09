<?php

use App\Traits\Setters\RequestSetterTrait;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->trait = new class
    {
        use RequestSetterTrait;

        public function getReferrerValue(): ?string
        {
            return $this->referrer;
        }

        public function getIsRefererAdminValue(): bool
        {
            return $this->isRefererAdmin;
        }
    };

    $this->appUrl = config('app.url');
});

describe('RequestSetterTrait', function (): void {
    test('defineRequestData sets referrer and isRefererAdmin correctly for admin URL', function (): void {
        $request = new Request;
        $request->headers->set('referer-slug', "$this->appUrl/admin");

        $this->trait->defineRequestData($request);

        expect($this->trait->getReferrerValue())->toBe("$this->appUrl/admin");
        expect($this->trait->getIsRefererAdminValue())->toBeTrue();
    });

    test('defineRequestData sets referrer and isRefererAdmin correctly for non-admin URL', function (): void {
        $request = new Request;
        $request->headers->set('referer-slug', "$this->appUrl/dashboard");

        $this->trait->defineRequestData($request);

        expect($this->trait->getReferrerValue())->toBe("$this->appUrl/dashboard");
        expect($this->trait->getIsRefererAdminValue())->toBeFalse();
    });

    test('defineRequestData sets referrer to null and isRefererAdmin to false when no referer header', function (): void {
        $request = new Request;

        $this->trait->defineRequestData($request);

        expect($this->trait->getReferrerValue())->toBeNull();
        expect($this->trait->getIsRefererAdminValue())->toBeFalse();
    });

    test('defineRequestData sets isRefererAdmin to false for unrelated URL patterns', function (): void {
        $request = new Request;
        $request->headers->set('referer-slug', "$this->appUrl/blog");

        $this->trait->defineRequestData($request);

        expect($this->trait->getReferrerValue())->toBe("$this->appUrl/blog");
        expect($this->trait->getIsRefererAdminValue())->toBeFalse();
    });
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');
