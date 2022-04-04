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

    // public function testCanAddTask()
    // {
    //     $response = $this->withHeaders([
    //         'Accept' => 'application/json',
    //         'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
    //     ])->postJson(
    //         '/api/tasks',
    //         [
    //             "id" => null,
    //             "title" => "Simple Test Task",
    //             "description" => "A simple test task",
    //             "tags" => [],
    //             "collaborators" => [],
    //             "questions" =>
    //             [
    //                 [
    //                     "text" => "What is 1 + 1?",
    //                     "helpText" => null,
    //                     "answers" => [
    //                         [
    //                             "text" => "5",
    //                             "is_correct" => false
    //                         ],
    //                         [
    //                             "text" => "3",
    //                             "is_correct" => false
    //                         ],
    //                         [
    //                             "text" => "2",
    //                             "is_correct" => true
    //                         ],
    //                         [
    //                             "text" => "0",
    //                             "is_correct" => false
    //                         ]
    //                     ],
    //                     "image_url" => null
    //                 ]
    //             ]
    //         ]
    //     );
    //     $response->assertStatus(201);
    // }
}
