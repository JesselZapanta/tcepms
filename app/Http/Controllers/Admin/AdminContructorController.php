<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ContructorStoreRequest;
use App\Http\Requests\Admin\ContructorUpdateRequest;
use App\Models\Contructor;
use Illuminate\Http\Request;

class AdminContructorController extends Controller
{
    public function index()
    {
        return inertia('Admin/Contructor/Index');
    }

    public function getData(Request $request)
    {
        return Contructor::where('company_name', 'like', "{$request->search}%")
                            ->orderBy($request->sortField, $request->sortOrder)
                            ->paginate(10);
    }

    public function store(ContructorStoreRequest $request)
    {
        $data = $request->validated();

        Contructor::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(ContructorUpdateRequest $request, $id)
    {
        $user = Contructor::findOrFail($id);
        
        $data = $request->validated();

        // return $data;
    
        $user->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        Contructor::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
