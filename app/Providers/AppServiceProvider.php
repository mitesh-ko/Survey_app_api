<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Survey;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // parent::boot();

        // Route::bind('survey', function ($value) {
        //     return Survey::where('slug', $value)->firstOrFail();
        // });
    }
}
