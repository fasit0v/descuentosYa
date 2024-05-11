<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                "availableRoutes" => $this->getAvailableRoutes($request),
                "permissionsInRoute" =>$this->getPermissionsInRoute($request),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }

    private function getPermissionsInRoute(Request $request){
        return User::join('user_roles', 'users.id', '=', 'user_roles.user_id')
    ->join('roles', 'user_roles.role_id', '=', 'roles.id')
    ->join('permissions', 'roles.id', '=', 'permissions.role_id')
    ->join('modules', 'modules.id', '=', 'permissions.module_id')
    ->select('permissions.id', 'permissions.canCreate', 'permissions.canRead', 'permissions.canUpdate', 'permissions.canDelete', 'modules.id', 'modules.moduleName', 'modules.moduleRoute')
    ->where('users.id', '=', $request->user()->id)
    ->where('modules.moduleRoute', '=', $request->route()->uri())
    ->get();

    }

    private function getAvailableRoutes(Request $request){
        return User::join('user_roles', 'users.id', '=', 'user_roles.user_id')
    ->join('roles', 'user_roles.role_id', '=', 'roles.id')
    ->join('permissions', 'roles.id', '=', 'permissions.role_id')
    ->join("modules", "modules.id" , "=", "permissions.module_id")
    ->select("modules.moduleName")
    ->where('users.id', "=",$request->user()->id)
    ->groupBy("modules.moduleName")
    ->get();
    }
}
