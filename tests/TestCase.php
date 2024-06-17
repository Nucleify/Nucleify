<?php

namespace Tests;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use App\Models\User;
use Closure;
use Illuminate\Database\Connection;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\SQLiteBuilder;
use Illuminate\Database\SQLiteConnection;
use Illuminate\Support\Fluent;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected User $admin, $user;

    protected function createUsers(): void
    {
        $this->admin = User::create([
            'id' => 1,
            'name' => fake()->firstName(),
            'email' => fake()->email(),
            'password' => Hash::make('password'),
            'role' => 'super_admin'
        ]);
        $this->user = User::create([
            'id' => 2,
            'name' => fake()->firstName(),
            'email' => fake()->email(),
            'password' => Hash::make('password'),
            'role' => 'user'
        ]);
    }

    public function __construct(?string $name = null, array $data = [], string $dataName = '')
    {
        $this->resolveSqlite();
        parent::__construct($name, $data, $dataName);
    }
    public function resolveSqlite()
    {
        Connection::resolverFor('sqlite',
            function ($connection, $database, $prefix, $config) {
                return new class($connection, $database, $prefix, $config)
                    extends SQLiteConnection {
                    public function getSchemaBuilder()
                    {
                        if ($this->schemaGrammar === null) {
                            $this->useDefaultSchemaGrammar();
                        }

                        return new class($this) extends SQLiteBuilder {
                            protected function createBlueprint($table, Closure $callback = null)
                            {
                                return new class($table, $callback) extends Blueprint {
                                    public function dropForeign($index)
                                    {
                                        return new Fluent();
                                    }
                                };
                            }
                        };
                    }
                };
            }
        );
    }
}
