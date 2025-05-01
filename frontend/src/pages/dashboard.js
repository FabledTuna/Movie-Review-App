import AppLayout from '@/components/Layouts/AppLayout'
import MovieList from '@/components/MovieList'
import Search from '@/components/Search'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router' // 検索ページへの遷移に必要
import TopRatedMovies from '@/components/TopRatedMovies'

const Dashboard = () => {
    const [nowPlaying, setNowPlaying] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter() // Next.js のルーター取得

    // 検索クエリを検索結果ページへ渡して遷移
    const handleSearch = (query) => {
        if (query.trim()) {
            router.push(`/search/${encodeURIComponent(query.trim())}`)
        }
    }

    // 上映中の映画を API から取得
    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/getNowPlayingMovies')
                if (!res.ok) throw new Error('映画データの取得に失敗しました')

                const data = await res.json()
                setNowPlaying(data.results)
            } catch (err) {
                console.error(err)
                setError('現在上映中の映画の取得に失敗しました')
            } finally {
                setLoading(false)
            }
        }

        fetchNowPlaying()
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head>
                <title>Dashboard - CinemaLoveReview</title>
            </Head>

            {/* 検索バー */}
            <Box maxWidth="lg" mx="auto" mt={4} px={2}>
                <Search onSearch={handleSearch} />
            </Box>

            {/* 映画一覧スライダー */}
            <Box maxWidth="lg" mx="auto" mt={4} px={2}>
                {loading && <CircularProgress />}
                {error && (
                    <Typography color="error" mt={2}>
                        {error}
                    </Typography>
                )}
                {!loading && !error && (
                    <MovieList
                        title="上映中の映画"
                        movies={nowPlaying}
                        variant="slider"
                    />
                )}
            </Box>
            {/* ランキング表示 */} 
            <Box maxWidth="lg" mx="auto" mt={6} px={2}>
                <TopRatedMovies />
            </Box>
        </AppLayout>
    )
}

export default Dashboard

