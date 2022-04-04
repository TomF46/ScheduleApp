<?php

namespace Tests\Helpers;

use App\Models\User;
use App\Models\Role;
use App\Enums\Roles;

class TestHelper
{
    public static function getBearerTokenForUser($user)
    {
        $pat = $user->createToken('Personal Access Token');
        return $pat->accessToken;
    }

    public static function createAdminUser()
    {
        return User::factory()->create([
            'role' => Roles::Administrator
        ]);
    }

    public static function createUser()
    {
        return User::factory()->create([
            'role' => Roles::User
        ]);
    }
}