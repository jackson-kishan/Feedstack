<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

class HasPermissionAccess
{
    public static function hasPermission(string|array $action): bool
    {
        return Auth::check() && Auth::user()->can($action);

    }

    public static function hasAnyPermission(array $permissions): bool
    {
        return Auth::check() && Auth::user()->hasAnyPermission($permissions);
    }

    public static function hasRole(string $role): bool
    {
        return Auth::check() && Auth::user()->hasRole($role);
    }

    public static function isSuperAdmin(): bool
    {
        return self::hasRole("Super Admin");
    }
    public static function isAdmin(): bool
    {
        return self::hasRole("Admin");
    }
    public static function isContributor(): bool
    {
        return self::hasRole("Contributor");
    }
    public static function isViewer(): bool
    {
        return self::hasRole("Viewer");
    }
}
