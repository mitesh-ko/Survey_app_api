<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyAnswerController;
use App\Http\Controllers\SurveyController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/my-details', [AuthController::class, 'myDetails']);
    // Survey resource with slug
    Route::prefix('survey')->group(function () {
        Route::get('/', [SurveyController::class, 'index'])->name('survey.index');
        Route::post('/', [SurveyController::class, 'store'])->name('survey.store');
        Route::get('/{survey:slug}', [SurveyController::class, 'show'])->name('survey.show');
        Route::put('/{survey:slug}', [SurveyController::class, 'update'])->name('survey.update');
        Route::delete('/{survey:slug}', [SurveyController::class, 'destroy'])->name('survey.destroy');
        Route::get('/{survey:slug}/answer', [SurveyAnswerController::class, 'index']);
    });
    
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);

Route::post('/survey/{survey:slug}/answer', [SurveyAnswerController::class, 'store']);