<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Auth\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call(PlaceCategorySeeder::class);
        $this->call(PlaceSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(ModuleSeeder::class);
        $this->call(PermissioneSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(UserRoleSeeder::class);
        $this->call(DiscountSeeder::class);

    }
}
