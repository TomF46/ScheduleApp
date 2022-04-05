<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Enums\TaskStatus;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function index(Request $request)
    {

        $tasks = Task::get()->map(function ($task) {
            return $task->map();
        });

        return response()->json($tasks);
    }

    public function show(Task $task)
    {
        return response()->json($task->map());
    }

    public function store(Request $request)
    {
        $attributes = $this->validateTask($request);

        $task = Task::create([
            'title' => $attributes['title'],
            'description' => $attributes['description'],
            'start_time' => $attributes['start_time'],
            'end_time' => $attributes['end_time']
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $attributes = $this->validateTask($request);
        $task->update($attributes);
        $task = $task->fresh();
        return response()->json($task);
    }

    public function destroy(Request $request, Task $task)
    {
        $task->delete();
        return response()->noContent();
    }

    public function assign(Request $request, Task $task, User $user)
    {
        // If user is already assigned immediately return success
        if($task->userIsAssigned($user)) return response()->json($task->map());

        $task->assign($user);
        $task = $task->fresh();
        return response()->json($task->map());
    }

    public function unassign(Request $request, Task $task, User $user)
    {
        // If user is already unassigned immediately return success
        if(!$task->userIsAssigned($user)) return response()->json($task->map());

        $task->unassign($user);
        $task = $task->fresh();
        return response()->json($task->map());
    }

    public function inProgress(Request $request, Task $task)
    {
        $task->setStatus(TaskStatus::InProgress);
        $task = $task->fresh();
        return response()->json($task->map());
    }

    public function notStarted(Request $request, Task $task)
    {
        $task->setStatus(TaskStatus::NotStarted);
        $task = $task->fresh();
        return response()->json($task->map());
    }

    public function completed(Request $request, Task $task)
    {
        $task->setStatus(TaskStatus::Completed);
        $task = $task->fresh();
        return response()->json($task->map());
    }

    protected function validateTask(Request $request)
    {
        return $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|max:1000',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time'
        ]);
    }
}
