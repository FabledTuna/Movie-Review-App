<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;

class MovieController extends Controller
{
    public function topRated()
    {
        // DBから映画ごとの平均評価を取得
        $topMovies = DB::table('reviews')
            ->select('movie_id', DB::raw('AVG(rating) as avg_rating'))
            ->groupBy('movie_id')
            ->orderByDesc('avg_rating')
            ->limit(5)
            ->get();

        $apiKey = config('services.tmdb.api_key');
        $result = [];

        foreach ($topMovies as $movie) {
            $tmdbUrl = "https://api.themoviedb.org/3/movie/{$movie->movie_id}?api_key={$apiKey}&language=ja-JP";
            $response = Http::get($tmdbUrl);

            if ($response->successful()) {
                $movieData = $response->json();

                $result[] = [
                    'movie_id'    => $movie->movie_id,
                    'title'       => $movieData['title'] ?? 'タイトル不明',
                    'poster_path' => $movieData['poster_path'] ?? null,
                    'avg_rating'  => round($movie->avg_rating, 1),
                    'id'          => $movie->movie_id,
                ];
            }
        }

        return response()->json($result);
    }
}
