<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use Tests\Helpers\TestHelper;

class UsersTest extends TestCase
{
    use RefreshDatabase;
    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanGetUsers()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/users');

        $response->assertOk();
    }

    public function testCanGetUser()
    {
        $user = TestHelper::createUser();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/users/' . $user->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $user->id,
        ]);
    }

    public function testCanUpdateUser()
    {
        $user = User::factory()->create([
            'firstName' => 'Dave',
            'lastName' => 'Smith'
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->putJson(
            '/api/users/' . $user->id,
            [
                'firstName' => 'Alan',
                'lastName' => 'Davies'
            ]
        );
        $response->assertOk();
        $response->assertJson([
            'firstName' => 'Alan',
            'lastName' => 'Davies'
        ]);
    }

    public function testCanDeleteUser()
    {
        $user = TestHelper::createUser();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->delete('/api/users/' . $user->id);

        $response->assertNoContent();
    }
}
