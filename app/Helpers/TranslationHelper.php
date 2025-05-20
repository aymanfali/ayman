<?php

namespace App\Helpers;

use Illuminate\Support\Facades\File;

class TranslationHelper
{
    public static function export(array $groups, string $locale = null): array
    {
        $locale = $locale ?: app()->getLocale();
        $translations = [];

        foreach ($groups as $group) {
            $path = resource_path("lang/{$locale}/{$group}.php");

            (File::exists($path)) ? $translations[$group] = include $path : $translations[$group] = [];
        }

        return $translations;
    }
}
