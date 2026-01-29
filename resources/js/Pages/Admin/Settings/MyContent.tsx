import React from "react";
import { BoardType, PageProps, PostTopicType, PostType } from "@/types";
import ContentCard from "@/Components/ContentCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";

type props = {
    board: BoardType;
    userBoards: BoardType[];
    auth: PageProps["auth"];
    posts: PostType[];
    postTopics: PostTopicType[];
};

const MyContent = ({ board, userBoards, auth, posts, postTopics }: props) => {
    return (
        <Authenticated board={board} userBoards={userBoards}>
            <main className="flex-1 py-5 lg:px-3 sm:px-2">
                <div className="mx-auto p-12 space-y-2">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-semibold">My Content</h1>
                    </div>

                    <ContentCard
                        posts={posts}
                        postTopics={postTopics}
                        auth={auth}
                        board={board}
                    />
                </div>
            </main>
        </Authenticated>
    );
};

export default MyContent;
