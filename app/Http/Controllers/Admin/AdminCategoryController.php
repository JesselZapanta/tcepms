<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class AdminCategoryController extends Controller
{
    public function index()
    {
        return inertia('Admin/Category/Index');
    }

    public function getData(Request $request)
    {
        return Category::where('name', 'like', "%{$request->search}%")
                            ->orderBy($request->sortField, $request->sortOrder)
                            ->paginate(10);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'status' => 'required',
        ]);

        Category::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        
        $data = $request->validate([
            'name' => 'required|string',
            'status' => 'required',
        ]);
        // return $data;
    
        $category->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        Category::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
