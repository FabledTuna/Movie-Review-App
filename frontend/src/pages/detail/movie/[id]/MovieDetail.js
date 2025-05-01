import Link from 'next/link'
import { Box, Typography, Alert, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import laravelApiClient from "@/lib/laravelApiClient";

export default function MovieDetail({ movie }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const res = await laravelApiClient.get('/api/likes/status', {
                    params: { movie_id: movie.id },
                });
                setLiked(res.data.liked);
            } catch (err) {
                console.error("いいね状態の取得に失敗しました", err);
            }
        };

        fetchLikeStatus();
    }, [movie.id]);

    const toggleLike = async () => {
        try {
            const res = await laravelApiClient.post('/api/likes', {
                movie_id: movie.id,
            });
            setLiked(res.data.liked);
        } catch (err) {
            console.error("いいねの切り替えに失敗しました", err);
        }
    };

    if (!movie) {
        return <Alert severity="error">映画情報を取得できませんでした。</Alert>;
    }

    return (
        <Box py={3} maxWidth="lg" mx="auto">
            <Stack direction={{ xs: "column", md: "row" }} spacing={4} p={3}>
                <Box flex={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title || movie.original_title}
                        style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
                    />
                </Box>
                <Box flex={2}>
                    <Typography variant="h4" fontWeight="bold">
                        {movie.title || movie.original_title}
                    </Typography>
                    <Typography variant="subtitle1" mt={2}>
                        {movie.overview || "概要がありません。"}
                    </Typography>
                    <Typography variant="body1" mt={2}>
                        公開日： {movie.release_date}
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        評価： {movie.vote_average} / 10
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        上映時間： {movie.runtime} 分
                    </Typography>

                    {/* いいねボタン */}
                    <Box mt={3}>
                        <Button
                            variant={liked ? 'contained' : 'outlined'}
                            color={liked ? 'secondary' : 'primary'}
                            onClick={toggleLike}
                            sx={{
                                backgroundColor: liked ? '#B0B0B0' : 'transparent',
                                color: liked ? '#ffffff' : '#1976d2',
                                border: liked ? 'none' : '1px solid #1976d2',
                                '&:hover': {
                                    backgroundColor: liked ? '#9e9e9e' : '#e3f2fd',
                                },
                            }}
                        >
                            {liked ? 'いいね済み' : 'いいね'}
                        </Button>
                    </Box>
                    <Box mt={3}>
                        <Link href="/likes" passHref>
                            <Button variant="outlined" color="secondary">
                                いいね一覧を見る
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}
