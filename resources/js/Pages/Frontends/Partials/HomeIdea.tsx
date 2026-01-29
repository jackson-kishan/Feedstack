import { useState } from "react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import { Link } from "@inertiajs/react";
import { StatusType, TopicType, PostType, BoardType, PageProps } from "@/types";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/Components/ui/select";
import CreateIdea from "../Ideas/CreateIdea";
import SideNav from "@/Components/SideNav";
import IdeaApproval from "@/Components/IdeaApproval";
import PostDetail from "@/Components/PostDetail";

type Props = {
    auth: PageProps["auth"];
    topics: TopicType[];
    posts: PostType[];
    statuses: StatusType[];
    board: BoardType;
    userBoards: BoardType[];
};

const Ideas = ({ auth, topics, posts, statuses, board, userBoards }: Props) => {
    const [allPosts, setAllPosts] = useState<PostType[]>(posts);
    //get sort key from url param
    const urlParams = new URLSearchParams(window.location.search);
    const [isOpen, setIsOpen] = useState(false);

    const [showPost, setShowPost] = useState(false);

    // const [sortKey, setSortKey] = useState(urlParams.get("sort") || "voted");

    const sortOptions = [
        { value: "latest", label: "Latest" },
        { value: "oldest", label: "Oldest" },
        { value: "voted", label: "Top Voted" },
        { value: "commented", label: "Top Commnted" },
    ];

    // sortOptions.map((p) => {
    //     console.log("sortOptions", p.value);
    // })

    return (
        <FrontendLayout board={board} posts={posts} userBoards={userBoards}>
            <div className="flex main-h-screen">
                <SideNav statuses={statuses} topics={topics} />
                <main className="flex-1 py-5 md:py-10 px-[120px]">
                    <header className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Feature Request</h1>
                        <div className="flex items-center space-x-4">
                            <CreateIdea
                                board={board}
                                auth={auth}
                                topics={topics}
                                statuses={statuses}
                            />

                            <Select
                                onValueChange={(e) => {
                                    // window.location.href = `?sort=${e}`;
                                    route("frontend.idea", {board: board, sort: e})
                                }}
                            >
                                <SelectTrigger className="w-auto p-4 font-semibold bg-primary text-white">
                                    <SelectValue placeholder="sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortOptions.map((option) => (
                                        <SelectItem value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </header>
                    <section className="mb-6 mt-2">
                        <h2 className="text-lg font-semibold">Trending</h2>
                    </section>
                    <IdeaApproval />

                    <section className="space-y-4">
                        {allPosts.map((post) => (
                            <PostDetail auth={auth} board={board} post={post} />
                        ))}
                    </section>
                </main>
            </div>
        </FrontendLayout>
    );
};

export default Ideas;
