<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'is_active' => '1',
            'image_url' => 'nullable|string',
        ]);

        $product = Product::create($validated);
        return response()->json(['message' => '商品创建成功', 'product' => $product], 201);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
            'name' => 'sometimes|required',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'is_active' => 'boolean',
            'image_url' => 'nullable|string',
        ]);

        $product = Product::findOrFail($validated['id']);

        $product->update($validated);
        return response()->json(['message' => '商品更新成功', 'product' => $product], 200);
    }

    public function delete(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
        ]);
        $product = Product::findOrFail($validated['id']);
        $product->delete();

        return response()->json(['message' => '商品删除成功'], 200);
    }

    public function getAllProducts()
    {
        $products = Product::all();
        return response()->json(['products' => $products], 200);
    }

    public function getActiveProducts()
    {
        $products = Product::where('is_active', true)->get();
        return response()->json(['products' => $products], 200);
    }
}

