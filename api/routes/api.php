<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FeedbackController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// User routes
Route::prefix('user')->group(function() {
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
});

// Product routes
Route::prefix('product')->group(function() {
    Route::post('create', [ProductController::class, 'create']);
    Route::post('update', [ProductController::class, 'update']);
    Route::post('delete', [ProductController::class, 'delete']);
    Route::get('all', [ProductController::class, 'getAllProducts']);
    Route::get('active', [ProductController::class, 'getActiveProducts']);
});
// Feedback routes