import React from 'react'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
} from '@mui/material'
import Slider from 'react-slick'
import { NextArrow, PrevArrow } from './Arrows'

export default function MovieList({ title, movies, variant = 'slider' }) {
    if (!movies || movies.length === 0) {
        return (
            <Typography variant="body1" mt={4}>
                映画が見つかりませんでした。
            </Typography>
        )
    }

    return (
        <Box py={3}>
            <Box maxWidth="lg" mx="auto" px={2}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    {title}
                </Typography>

                {variant === 'slider' ? (
                    // ===== スライダー表示 =====
                    <Slider
                        infinite={false}
                        speed={500}
                        slidesToShow={5}
                        slidesToScroll={3}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                        responsive={[
                            { breakpoint: 1200, settings: { slidesToShow: 3 } },
                            { breakpoint: 768, settings: { slidesToShow: 2 } },
                            { breakpoint: 480, settings: { slidesToShow: 1 } },
                        ]}
                    >
                        {movies.map((movie) => (
                            <Box key={movie.id} px={1}>
                                <Link
                                    href={`/detail/movie/${movie.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Card sx={{ cursor: 'pointer' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                image={
                                                    movie.poster_path
                                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                        : '/no-image.png'
                                                }
                                                alt={movie.title}
                                                sx={{ height: 300, objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    noWrap
                                                >
                                                    {movie.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            </Box>
                        ))}
                    </Slider>
                ) : (
                    // ===== 一覧表示（Box） =====
                    <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
                        {movies.map((movie) => (
                            <Box
                                key={movie.id}
                                flex="1 1 calc(25% - 16px)"
                                maxWidth="calc(25% - 16px)"
                                sx={{
                                    '@media (max-width: 1200px)': {
                                        flex: '1 1 calc(33.333% - 16px)',
                                        maxWidth: 'calc(33.333% - 16px)',
                                    },
                                    '@media (max-width: 900px)': {
                                        flex: '1 1 calc(50% - 16px)',
                                        maxWidth: 'calc(50% - 16px)',
                                    },
                                    '@media (max-width: 600px)': {
                                        flex: '1 1 100%',
                                        maxWidth: '100%',
                                    },
                                }}
                            >
                                <Link
                                    href={`/detail/movie/${movie.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Card sx={{ cursor: 'pointer' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                image={
                                                    movie.poster_path
                                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                        : '/no-image.png'
                                                }
                                                alt={movie.title}
                                                sx={{ height: 300, objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                    noWrap
                                                >
                                                    {movie.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    )
}
