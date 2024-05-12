<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(){
        
        return Inertia::render("Roles/index") ;
    }

    public function store(){
        
    }
    public function update(){
        
    }
    public function destroy(){
        
    }
}
