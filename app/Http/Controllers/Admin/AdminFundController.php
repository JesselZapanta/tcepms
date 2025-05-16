<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fund;
use Illuminate\Http\Request;

class AdminFundController extends Controller
{
    public function index()
    {
        return inertia('Admin/Fund/Index');
    }

    public function getData(Request $request)
    {
        // return $request;//search GAA
        // not return General Appropriations Act (GAA)
        return Fund::where('name', 'like', "%{$request->search}%")
                            ->orderBy($request->sortField, $request->sortOrder)
                            ->paginate(10);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'status' => 'required',
        ]);

        Fund::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $fund = Fund::findOrFail($id);
        
        $data = $request->validate([
            'name' => 'required|string',
            'status' => 'required',
        ]);
        // return $data;
    
        $fund->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destroy($id)
    {
        Fund::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
