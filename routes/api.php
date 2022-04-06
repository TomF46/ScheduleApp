<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);

    Route::group([
        'middleware' => ['auth:api']
    ], function () {
        Route::get('logout', [App\Http\Controllers\AuthController::class, 'logout']);
        Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
        Route::post('changePassword', [App\Http\Controllers\AuthController::class, 'changePassword']);
    });
});

Route::middleware(['auth:api'])->group(function () {  
    Route::get('/me/isAdmin', [App\Http\Controllers\MeController::class, 'isAdmin']);

    Route::get('/tasks', [App\Http\Controllers\TasksController::class, 'index']);
    Route::get('/tasks/{task}', [App\Http\Controllers\TasksController::class, 'show']);
    Route::post('/tasks/{task}/status/notStarted', [App\Http\Controllers\TasksController::class, 'notStarted']);
    Route::post('/tasks/{task}/status/inProgress', [App\Http\Controllers\TasksController::class, 'inProgress']);
    Route::post('/tasks/{task}/status/completed', [App\Http\Controllers\TasksController::class, 'completed']);

});

Route::middleware(['auth:api', 'admin'])->group(function () {

    Route::get('/users', [App\Http\Controllers\UsersController::class, 'index']);
    Route::get('/users/{user}', [App\Http\Controllers\UsersController::class, 'show']);
    Route::put('/users/{user}', [App\Http\Controllers\UsersController::class, 'update']);
    Route::delete('/users/{user}', [App\Http\Controllers\UsersController::class, 'delete']);
    Route::post('/users/search', [App\Http\Controllers\UsersController::class, 'filter']);


    Route::post('/tasks', [App\Http\Controllers\TasksController::class, 'store']);
    Route::put('/tasks/{task}', [App\Http\Controllers\TasksController::class, 'update']);
    Route::delete('/tasks/{task}', [App\Http\Controllers\TasksController::class, 'destroy']);
    Route::post('/tasks/{task}/assign/{user}', [App\Http\Controllers\TasksController::class, 'assign']);
    Route::post('/tasks/{task}/unassign/{user}', [App\Http\Controllers\TasksController::class, 'unassign']);
});