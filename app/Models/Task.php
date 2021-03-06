<?php

namespace App\Models;

use App\Traits\UserAssignable;
use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Task extends Model
{
    use HasFactory, UserAssignable;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'start_time',
        'end_time'
    ];

    public function map()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'assignedUsers' => $this->assignedUsers()->get()->map(function ($user) {
                return $user->map();
            }),
            'status' => $this->status,
            'statusText' => $this->getStatusText($this->status)
        ];
    }

    public function setStatus($status){
        $this->status = $status;
        $this->save();
    }

    protected function getStatusText($status)
    {
        switch ($status) {
            case TaskStatus::NotStarted:
                return "Not Started";
                break;
            case TaskStatus::InProgress:
                return "In Progress";
                break;
            case TaskStatus::Completed:
                return "Completed";
                break;
        }
    }
}
