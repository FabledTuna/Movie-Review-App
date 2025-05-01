export default async function handler(req, res) {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: '検索クエリが必要です' });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                query
            )}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ja-JP`
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`TMDB API Error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('APIエラー:', error);
        res.status(500).json({ error: 'サーバー側でエラーが発生しました' });
    }
}
