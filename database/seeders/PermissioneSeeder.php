<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissioneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("permissions")->insert([[
            "module_id"=>1,
            "role_id"=>2,
            "canCreate"=>1,
            "canDelete"=>1,
            "canRead"=>1,
            "canUpdate"=>1
        ]]);
    }
}
