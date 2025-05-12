<?php

namespace App\Providers;

use App\Models\Project;
use App\Models\Service;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Inertia\Inertia;
use Illuminate\Http\Request; // ✅ Correct


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->setupCommandsSafely();
        $this->tuneModelBehavior();
        $this->enforceSecureUrls();
        $this->optimizeViteSettings();
    }

    /**
     * Prevent destructive commands in production.
     */
    private function setupCommandsSafely(): void
    {
        DB::prohibitDestructiveCommands($this->app->isProduction());
    }
    /**
     * Fine-tune Eloquent model behavior.
     */
    private function tuneModelBehavior(): void
    {
        Model::shouldBeStrict();
        Model::unguard();
    }

    /**
     * Force HTTPS in non-local environments.
     */
    private function enforceSecureUrls(): void
    {
        if (!$this->app->environment('local')) {
            URL::forceScheme('https');
        }
    }

    /**
     * Optimize Vite asset loading strategy.
     */
    private function optimizeViteSettings(): void
    {
        Vite::usePrefetchStrategy('aggressive');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'projects' => function () {
                return Project::latest()->take(5)->get(); // or whatever logic you need
            },
            'services' => function () {
                return Service::latest()->take(5)->get(); // or whatever logic you need
            }
        ]);
    }
}
