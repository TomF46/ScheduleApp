<?php

namespace App\Http\Controllers;

use App\Models\Task;
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
