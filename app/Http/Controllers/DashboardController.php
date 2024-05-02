<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
   public function index()
   {
        /* $usedFeatures = UsedFeature::query()
        ->with(['feature'])
        ->where('user_id', auth()->user()->id)
        ->latest()
        ->paginate(20); */

        return inertia('Dashboard');
   }
}
