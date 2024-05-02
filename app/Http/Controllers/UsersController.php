<?php

namespace App\Http\Controllers;
use App\Http\Requests\UsersCreatedRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        $user = Auth::user();

       

        return Inertia::render('Users/Index', [
            'filters' => Request::all('search','role','trashed'),
            'users' => new UserCollection(
                Auth::user()->account->users()
                     ->orderByName()
                     ->filter(Request::only('search','role','trashed'))
                     ->paginate()
                     ->appends(Request::all())
            )
        ]);
    }


    public function create()
    {
        return inertia('Users/Create');
    }

    public function store(UsersCreatedRequest $request)
    {
        $user =  auth()->user();
        $input = $request->validated();

        $user->account->users()->create($input);

        return route_to('users')
             ->with('success', 'Users Created Successfully');
    }

    public function edit(User $user)
    {
        return inertia('Users/Edit',[
            'user' => new UserResource($user),
        ]);
    }

    public function update(User $user, UsersUpdatedRequest $request)
    {   
        $input = $request->validated();
        $user->update($input);

        return Redirect::back()->with('success','Users Updated Successfully');
    }

    public function destroy(User $user, UsersDeletedRequest $request)
    {
         $user->delete();

         return Redirect::back()->with('success', 'Users Deleted Successfully');
    }

    public function restore(User $user)
    {
        $user->restore();

         return Redirect::back()->with('success', 'Users Restored Successfully');
    }
}
