<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;

class LikeController extends Controller
{
    // いいねを切り替える（追加 or 削除）
    public function toggleLike(Request $request)
    {
        $userId = auth()->id();
        $movieId = $request->input('movie_id');

        $like = Like::where('user_id', $userId)->where('movie_id', $movieId)->first();

        if ($like) {
            $like->delete();
            return response()->json(['liked' => false]);
        } else {
            Like::create(['user_id' => $userId, 'movie_id' => $movieId]);
            return response()->json(['liked' => true]);
        }
    }

    // 指定された映画をユーザーがいいねしているかを確認
    public function checkLikeStatus(Request $request)
    {
        $userId = auth()->id();
        $movieId = $request->input('movie_id');

        $liked = Like::where('user_id', $userId)->where('movie_id', $movieId)->exists();

        return response()->json(['liked' => $liked]);
    }

    // ユーザーの全いいねを取得
    public function index()
    {
        return Like::where('user_id', auth()->id())->get();
    }
}
