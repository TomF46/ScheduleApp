<?php

namespace App\Http\Controllers;

use App\Filters\UserSearch;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $users = User::orderBy('role', 'asc')->paginate(20);
        $users->getCollection()->transform(function ($user){
            return $user->map();
        });
        return response()->json($users);
    }

    public function filter(Request $request)
    {
        $paginator = UserSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($user){
            return $user->map();
        });

        return response()->json($paginator);
    }

    public function show(Request $request, User $user)
    {
        return response()->json($user->map());
    }

    public function update(Request $request, User $user)
    {
        $attributes = $this->validateUpdate($request);
        $user->update($attributes);
        $user = $user->fresh();
        return response()->json($user);
    }

    public function delete(User $user)
    {
        $user->delete();
        return response()->noContent();
    }


    protected function validateUpdate(Request $request)
    {
        return $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255'
        ]);
    }
}
