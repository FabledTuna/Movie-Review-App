import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React from 'react'
import MovieDetail from './MovieDetail'
import MovieReviews from '@/components/MovieReviews'

export default function index({ movie, movieId }) {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail
                </h2>
            }
        >
            <Head>
                <title>Detail - CinemaLoveReview</title>
            </Head>

            {/* 映画詳細（いいね機能付き） */}
            <MovieDetail movie={movie} />

            {/* レビュー一覧 */}
            <MovieReviews movieId={movieId} />
        </AppLayout>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params

    try {
        // 日本語の映画情報取得
        const responseJP = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ja-JP`
        )
        const movieJP = await responseJP.json()

        let overview = movieJP.overview

        // 日本語がない場合、英語のあらすじ取得
        if (!overview) {
            const responseEN = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
            )
            const movieEN = await responseEN.json()
            overview = movieEN.overview
        }

        return {
            props: {
                movie: { ...movieJP, overview },
                movieId: id,
            },
        }
    } catch (error) {
        console.error('Error fetching movie details:', error)
        return {
            props: { movie: null },
        }
    }
}
