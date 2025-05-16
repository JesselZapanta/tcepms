<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserStoreRequest;
use App\Http\Requests\Admin\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminUserController extends Controller
{
    public function index()
    {
        return inertia('Admin/User/Index');
    }

    // public function getData(Request $request)
    // {
    //     return User::where('id', '!=', Auth::user()->id)
    //                 ->where(function($query) use ($request) {
    //                     $query->where('name', 'like', "{$request->search}%")
    //                             ->orWhere('email', 'like', "{$request->search}%");
    //                 })
    //                 ->orderBy($request->sortField, $request->sortOrder)
    //                 ->paginate(10);
    // }

    public function getData(Request $request)
    {
        $users = User::where('id', '!=', Auth::id())
                    ->where(function ($query) use ($request) {
                        $query->where('name', 'like', "%{$request->search}%")
                                ->orWhere('email', 'like', "%{$request->search}%");
                    })
                    ->orderBy($request->sortField, $request->sortOrder)
                    ->paginate(10);

        // Modify the contact field for each user
        $users->getCollection()->transform(function ($user) {
            if (str_starts_with($user->contact, '+63')) {
                $user->contact = substr($user->contact, 3); // Remove "+63"
            }
            return $user;
        });

        return response()->json($users);
    }


    public function store(UserStoreRequest $request)
    {
        $data = $request->validated();

        $data['password'] = bcrypt($data['password']);

        if (!str_starts_with($data['contact'], '+63')) {
            $data['contact'] = '+63' . $data['contact'];
        }

        User::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->validated();

        if(!empty($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }else{
            unset($data['password']);
        }

        if (!empty($data['contact']) && !str_starts_with($data['contact'], '+63')) {
            $data['contact'] = '+63' . $data['contact'];
        }

        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        User::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
