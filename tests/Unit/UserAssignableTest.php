<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Task;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;


class UserAssignableTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanBeAssignedToATask()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create();

        $task->assign($user);

        $this->assertTrue($task->userIsAssigned($user));
    }

    public function testUserCanBeUnassignedToATask()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create();

        $task->assign($user);

        $this->assertTrue($task->userIsAssigned($user));

        $task->unassign($user);

        $this->assertFalse($task->userIsAssigned($user));
    }

    public function testCanReturnTasksAssignedUsers()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $task = Task::factory()->create();

        $task->assign($user1);
        $task->assign($user2);

        $this->assertEquals(2, $task->assignedUserCount());
    }
}
