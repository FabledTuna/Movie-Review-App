import { useEffect, useState } from 'react'
import { Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material'
import laravelApiClient from '@/lib/laravelApiClient'
import Link from 'next/link'

export default function TopRatedMovies() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const res = await laravelApiClient.get('/api/movies/top-rated')
                const formatted = res.data.map(movie => ({
                    ...movie,
                    avg_rating: Number(movie.avg_rating ?? 0), // undefined対策
                }))
                setMovies(formatted)
            } catch (error) {
                console.error('おすすめ映画の取得に失敗しました', error)
            }
        }

        fetchTopRatedMovies()
    }, [])

    return (
        <Box mt={6}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                みんなのおすすめランキング
            </Typography>
            <Grid container spacing={2}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.movie_id}>
                        <Link href={`/detail/movie/${movie.movie_id}`} passHref>
                            <Card sx={{ cursor: 'pointer' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : '/no-image.png'
                                    }
                                    alt={movie.title}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body2">
                                        平均評価：
                                        {movie.avg_rating
                                            ? movie.avg_rating.toFixed(1)
                                            : '評価なし'}{' '}
                                        / 5
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
