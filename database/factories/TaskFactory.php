<?php

namespace Database\Factories;

use App\Models\Task;
use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->text(20),
            'description' => $this->faker->text,
            'start_time' => now(),
            'end_time' =>  now()->add(1, 'day'),
            'status' => $this->faker->randomElement([TaskStatus::NotStarted, TaskStatus::InProgress, TaskStatus::Completed])
        ];
    }
}
