<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use Tests\Helpers\TestHelper;


class TaskTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = TestHelper::createAdminUser();
    }

    public function testCanGetTasks()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/tasks');
        $response->assertStatus(200);
    }

    public function testCanGetSpecificTask()
    {
        $task = $this->testTask = Task::factory()->create();
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/tasks/' . $task['id']);
        $response->assertStatus(200);
        $response->assertJson([
            'title' => $task['title']
        ]);
    }

    public function testCanAddTask()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/tasks',
            [
                "title" => "Simple Test Task",
                "description" => "A simple test task",
                'start_time' => now()->format('Y-m-d H:i:s'),
                'end_time' =>  now()->add(1, 'day')->format('Y-m-d H:i:s')
            ]
        );
        $response->assertStatus(201);
    }

    public function testCanUpdateTask()
    {
        $task = $this->testTask = Task::factory()->create();

        $updatedBody = [
            "title" => "Updated Test Task",
            "description" => "An updated test task",
            'start_time' => now()->format('Y-m-d H:i:s'),
            'end_time' =>  now()->add(1, 'day')->format('Y-m-d H:i:s')
        ];
        
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->putJson(
            '/api/tasks/' . $task->id, $updatedBody
        );

        $response->assertOk();
        $response->assertJson($updatedBody);
    }

    public function testCanDeleteTask()
    {
        $task = $this->testTask = Task::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->delete('/api/tasks/' . $task->id);

        $response->assertNoContent();
    }
}
