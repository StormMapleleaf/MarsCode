<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Product;

class ProductController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('products'), $imageName);
            $imageUrl = url('products/' . $imageName);
        }

        $product = new Product();
        $product->name = $validated['name'];
        $product->description = $validated['description'];
        $product->price = $validated['price'];
        $product->is_active = 1;
        $product->image_url = $imageUrl;
        $product->save();

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

