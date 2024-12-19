<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminUserController extends Controller
{
    public function index()
    {
        return inertia('Admin/User/Index');
    }

    public function getData(Request $request)
    {
        return User::where('name', 'like', "{$request->search}%")
                    ->orWhere('email', 'like', "{$request->search}%")
                    ->whereNot('id', Auth::user()->id)
                    ->orderBy($request->sortField, $request->sortOrder)
                    ->paginate(10);
    }

    public function store(UserStoreRequest $request)
    {
        $data = $request->validated();

        $data['password'] = bcrypt($data['password']);

        User::create($data);

        return response()->json([
            'status' => 'created'
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
