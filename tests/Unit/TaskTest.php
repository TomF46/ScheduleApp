<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Task;
use App\Enums\TaskStatus;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function testTaskStatusCanBeSet()
    {
        $task = Task::factory()->create([
            'status' => TaskStatus::NotStarted
        ]);
        $this->assertEquals(TaskStatus::NotStarted, $task->status);

        $task->setStatus(TaskStatus::InProgress);
        $this->assertEquals(TaskStatus::InProgress, $task->status);

    }
}
