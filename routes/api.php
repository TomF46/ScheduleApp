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
    Route::get('/tasks', [App\Http\Controllers\TasksController::class, 'index']);
    Route::get('/tasks/{task}', [App\Http\Controllers\TasksController::class, 'show']);
});

Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('/tasks', [App\Http\Controllers\TasksController::class, 'store']);
    Route::put('/tasks/{task}', [App\Http\Controllers\TasksController::class, 'update']);
    Route::delete('/tasks/{task}', [App\Http\Controllers\TasksController::class, 'destroy']);
    Route::post('/tasks/{task}/assign/{user}', [App\Http\Controllers\TasksController::class, 'assign']);
    Route::post('/tasks/{task}/unassign/{user}', [App\Http\Controllers\TasksController::class, 'unassign']);
});