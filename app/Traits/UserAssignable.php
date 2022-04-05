<?php

namespace App\Traits;

use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

trait UserAssignable
{

    public function assign(User $user)
    {
        return $this->assignedUsers()->save($user);
    }

    public function unassign(User $user)
    {
        return $this->assignedUsers()->detach($user);
    }

    public function userIsAssigned(User $user)
    {
        return DB::table('task_user_assignments')
            ->where('user_id', $user->id)
            ->where('task_id', $this->id)
            ->exists();
    }

    public function assignedUserCount()
    {
        return DB::table('task_user_assignments')
            ->where('task_id', $this->id)
            ->count();
    }

    public function assignedUsers()
    {
        return $this->belongsToMany(User::class, 'task_user_assignments', 'task_id', 'user_id');
    }
}
