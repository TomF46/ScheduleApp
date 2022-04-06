<?php

namespace App\Filters;

use App\Models\User;
use Illuminate\Http\Request;

class UserSearch
{
    public static function apply(Request $filters)
    {
        $user = (new User)->newQuery();

        if ($filters->has('firstName')) {
            $user->where('firstName', 'like', "{$filters->input('firstName')}%");
        }

        if ($filters->has('lastName')) {
            $user->where('lastName', 'like', "{$filters->input('lastName')}%");
        }

        return $user;
    }
}
