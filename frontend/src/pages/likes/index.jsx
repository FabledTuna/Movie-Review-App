import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import LikedMoviesPage from './LikedMoviesPage'

export default function Likes() {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    いいね一覧
                </h2>
            }
        >
            <Head>
                <title>Liked Movies - CinemaLoveReview</title>
            </Head>

            <LikedMoviesPage />
        </AppLayout>
    )
}
