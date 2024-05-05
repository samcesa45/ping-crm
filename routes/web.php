<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth','verified'])->group(function () {
    Route::get('dashboard',[DashboardController::class,'index'])->name('dashboard');
    Route::get('users',[UsersController::class,'index'])->name('users');
    Route::post('users',[UsersController::class,'index'])->name('users.store');
    Route::get('users/create',[UsersController::class,'create'])->name('users.create');
    Route::get('users/{user}/edit',[UsersController::class,'edit'])->name('users.edit');

    Route::get('organizations',[OrganizationController::class,'index'])->name('organizations');
    Route::post('organizations',[OrganizationController::class,'index'])->name('organizations.store');
    Route::get('organizations/create',[OrganizationController::class,'create'])->name('organizations.create');
    Route::get('organizations/{organization}/edit',[OrganizationController::class,'edit'])->name('organizations.edit');

    Route::get('contacts',[ContactController::class,'index'])->name('contacts');
    Route::post('contacts',[ContactController::class,'index'])->name('contacts.store');
    Route::get('contacts/create',[ContactController::class,'create'])->name('contacts.create');
    Route::get('contacts/{contact}/edit',[ContactController::class,'edit'])->name('contacts.edit');
   
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
