<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use App\Enums\TaskStatus;
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
        $task = Task::factory()->create();
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
        $task = Task::factory()->create();

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
        $task = Task::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->delete('/api/tasks/' . $task->id);

        $response->assertNoContent();
    }

    public function testCanAssignUserToTask()
    {
        $task = Task::factory()->create();
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/assign/' . $user->id);

        $response->assertOk();
        $response->assertJsonCount(1, "assignedUsers");
    }

    public function testCanUnassignUserToTask()
    {
        $task = Task::factory()->create();
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/assign/' . $user->id);

        $response->assertOk();
        $response->assertJsonCount(1, "assignedUsers");

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/unassign/' . $user->id);

        $response->assertOk();
        $response->assertJsonCount(0, "assignedUsers");
    }

    public function testAssigningAlreadyAssignUserToTaskIsSuccess()
    {
        $task = Task::factory()->create();
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/assign/' . $user->id);

        $response->assertOk();
        $response->assertJsonCount(1, "assignedUsers");

        $response2 = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/assign/' . $user->id);

        $response2->assertOk();
        $response2->assertJsonCount(1, "assignedUsers");
    }

    public function testUnassigningUserToTaskWhoIsNotAssignedIsSuccess()
    {
        $task = Task::factory()->create();
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/unassign/' . $user->id);

        $response->assertOk();
        $response->assertJsonCount(0, "assignedUsers");
    }

    public function testCanSetTaskStatusToInProgress()
    {
        $task = Task::factory()->create([
            'status' => TaskStatus::NotStarted
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/status/inProgress');

        $response->assertOk();
        $response->assertJson([
            'status' => TaskStatus::InProgress
        ]);
    }

    public function testCanSetTaskStatusToCompleted()
    {
        $task = Task::factory()->create([
            'status' => TaskStatus::InProgress
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/status/completed');

        $response->assertOk();
        $response->assertJson([
            'status' => TaskStatus::Completed
        ]);
    }

    public function testCanSetTaskStatusToNotStarted()
    {
        $task = Task::factory()->create([
            'status' => TaskStatus::InProgress
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/tasks/' . $task->id . '/status/notStarted');

        $response->assertOk();
        $response->assertJson([
            'status' => TaskStatus::NotStarted
        ]);
    }
}
