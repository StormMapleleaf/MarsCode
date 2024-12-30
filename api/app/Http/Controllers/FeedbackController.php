<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FeedbackController extends Controller
{
    /**
     * 发表新的反馈
     */
    public function create(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $feedback = Feedback::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json($feedback, 201);
    }

    /**
     * 获取指定商品的所有反馈
     */
    public function getProductFeedbacks(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'page' => 'integer|min:1'
        ]);

        $feedbacks = Feedback::where('product_id', $request->product_id)
            ->orderBy('created_at', 'desc')  // 按创建时间降序排序，确保最新的反馈在前
            ->paginate(10);  // 每页10条，可以根据需求调整

        // 获取所有反馈对应的用户ID
        $userIds = $feedbacks->pluck('user_id')->unique();

        // 获取这些用户的名字
        $userNames = User::whereIn('id', $userIds)->pluck('username', 'id');

        // 将用户名添加到反馈数据中
        $feedbacks->getCollection()->transform(function ($feedback) use ($userNames) {
            $feedback->user_name = $userNames[$feedback->user_id] ?? null;
            return $feedback;
        });

        return response()->json($feedbacks);
    }
}
