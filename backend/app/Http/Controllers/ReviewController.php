<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $movieId = $request->query('movie_id');
        $reviews = $movieId
            ? Review::with('user')->where('movie_id', $movieId)->get()
            : Review::with('user')->get();

        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'review_text' => 'required|string|max:255',
                'movie_id' => 'required|integer',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            $review = Review::create([
                'user_id' => Auth::id(),
                'movie_id' => $validated['movie_id'],
                'review_text' => $validated['review_text'],
                'rating' => $validated['rating'],
            ]);

            $reviewWithUser = Review::with('user')->find($review->id);

            return response()->json([
                'message' => 'Review saved successfully!',
                'review' => $reviewWithUser,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'review_text' => 'required|string|max:255',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            $review = Review::findOrFail($id);

            if ($review->user_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $review->update([
                'review_text' => $validated['review_text'],
                'rating' => $validated['rating'],
            ]);

            $updated = Review::with('user')->find($review->id);

            return response()->json([
                'message' => 'Review updated successfully!',
                'review' => $updated,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json(['message' => 'The review has been successfully deleted.']);
    }
}
