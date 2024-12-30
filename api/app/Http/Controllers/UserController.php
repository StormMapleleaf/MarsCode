<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|unique:users,username',
            'phone_number' => 'required|unique:users,phone_number',
            'password' => 'required|min:6',
        ]);
    
        $user = User::create([
            'username' => $validated['username'],
            'phone_number' => $validated['phone_number'],
            'password' => Hash::make($validated['password']),
            'is_active' => true,
            'role' => 'user',
        ]);
    
        return response()->json(['message' => '注册成功', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'phone_number' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('phone_number', $credentials['phone_number'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => '登录失败'], 401);
        }

        return response()->json(['message' => '登录成功', 'user' => $user], 200);
    }
}
