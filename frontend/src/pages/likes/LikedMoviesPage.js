import React, { useEffect, useState } from 'react'
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material'
import laravelApiClient from '@/lib/laravelApiClient'

export default function LikedMoviesPage() {
    const [likedMovies, setLikedMovies] = useState([])
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

    useEffect(() => {
        const fetchLikedMovies = async () => {
            try {
                const res = await laravelApiClient.get('/api/likes')
                const likedMovieIds = res.data.map(like => like.movie_id)

                const movieDetails = await Promise.all(
                    likedMovieIds.map(async id => {
                        const response = await fetch(
                            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ja-JP`
                        )
                        return await response.json()
                    })
                )

                setLikedMovies(movieDetails)
            } catch (error) {
                console.error('いいね映画の取得に失敗しました:', error)
            }
        }

        fetchLikedMovies()
    }, [apiKey])

    return (
        <Grid container spacing={3} sx={{ padding: 3 }}>
            {likedMovies.map(movie =>
                movie.id ? (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="400"
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{movie.title}</Typography>
                                <Typography variant="body2">
                                    {movie.release_date}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ) : null
            )}
        </Grid>
    )
}
