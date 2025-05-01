import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import AppLayout from '@/components/Layouts/AppLayout'
import MovieList from '@/components/MovieList'

export default function SearchResultsPage() {
    const router = useRouter()
    const { query } = router.query
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return
            try {
                setLoading(true)
                setError(null)

                const res = await fetch(`/api/getSearchResults?query=${encodeURIComponent(query)}`)
                if (!res.ok) throw new Error('検索に失敗しました')

                const data = await res.json()
                setResults(data.results)
            } catch (err) {
                console.error(err)
                setError('検索エラーが発生しました')
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [query])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    検索結果
                </h2>
            }
        >
            <Box maxWidth="lg" mx="auto" mt={4} px={2}>
                {loading && <CircularProgress />}
                {error && <Typography color="error">{error}</Typography>}

                {!loading && !error && (
                    <MovieList
                        title={`「${query}」の検索結果`}
                        movies={results}
                        variant="list" // ← 一覧表示
                    />
                )}
            </Box>
        </AppLayout>
    )
}
