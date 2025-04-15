<?php if (!defined('PEST_RUNNING')) return; 


use function Pest\Laravel\mock;

use App\Models\Technology;
use App\Services\TechnologyService;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(TechnologyService::class);
});

describe('500 > Internal Server Error', function() {
    test('index api', function () {
        $this->service
            ->shouldReceive('index')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('technologies.index'));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function () {
        $this->service
            ->shouldReceive('show')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('technologies.show', ['id' => 1]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('store api', function () {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->postJson(route('technologies.store'), technologyData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('update api', function () {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->putJson(route('technologies.update', technologyData['id']), updatedTechnologyData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function () {
        $technology = Technology::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->deleteJson(route('technologies.destroy', ['id' => $technology->id]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});
