import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/Components/ui/card';
import { FiUsers } from 'react-icons/fi';
import { CiViewBoard } from "react-icons/ci";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";
import { BoardType, UserRoles, CommentType, PageProps, PostType } from '@/types';

type Props = {
    board: BoardType;
    auth: PageProps['auth'];
    userBoards: BoardType[];
    posts: PostType[];
    comments: CommentType[];
}

export default function Dashboard({ auth, board, userBoards, posts, comments }: Props) {

    return (
        <AuthenticatedLayout
         board={board}
         userBoards={userBoards}
         >
            <Head title="Dashboard" />

            <div className="py-2">
                <div className="max-w-full mx-auto sm:px-6 lg:px-3">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col">
                         <main className="flex-1 p-2 md:p-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                   <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Total Users</CardTitle>
                                    <FiUsers className="h-4 w-4 text-muted-foreground"></FiUsers>
                                    </CardHeader>

                                    <CardContent className="flex items-center justify-center">
                                        <div className="text-4xl font-bold">{board.slug}</div>
                                    </CardContent>

                                </Card>


                               <Card>
                               <CardHeader className="flex items-center justify-between">
                                <CardTitle>Total Board</CardTitle>
                                <CiViewBoard className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent className="flex items-center justify-center">
                                    <div className="text-4xl font-bold">{userBoards.length}</div>
                                </CardContent>
                            </Card>





                                <Card>
                                   <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Total Post</CardTitle>
                                    <MdOutlinePostAdd  className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center">
                                        <div className="text-4xl font-bold">{posts.length}</div>
                                    </CardContent>
                                </Card>

                                <Card>
                                   <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Subscription</CardTitle>
                                    <MdSubscriptions className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center">
                                        <div className="text-4xl font-bold">1,234</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                   <CardHeader className="flex items-center justify-between">
                                    <CardTitle>Total Comments</CardTitle>
                                    <MdSubscriptions className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center">
                                        <div className="text-4xl font-bold">{comments.length}</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </main>


                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
