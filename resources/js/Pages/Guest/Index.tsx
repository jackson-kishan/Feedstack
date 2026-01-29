import Welcome from "../Welcome";
import { BoardType, PageProps, PostType, StatusType, TopicType } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import SideNav from "@/Components/SideNav";
import CreateIdea from "../Frontends/Ideas/CreateIdea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";
import PostDetail from "@/Components/PostDetail";

type Props = {
    board: BoardType;
    auth: PageProps['auth'];
    posts: PostType[];
    topics: TopicType[];
    statuses: StatusType[];
};

const Index = ({auth, board, posts, topics, statuses }: Props) => {
    const [allPosts, setAllPosts] = useState<PostType[]>(posts);

    const sortOptions = [
        { value: "latest", label: "Latest" },
        { value: "oldest", label: "Oldest" },
        { value: "voted", label: "Top Voted" },
        { value: "commented", label: "Top Commnted" },
    ];


    return (
        <Welcome board={board} auth={auth} posts={allPosts}>
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

                            <Select>
                                <SelectTrigger className="w-auto p-4 font-semibold bg-primary text-white">
                                    <SelectValue placeholder="sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sortOptions.map((option) => (
                                        <Link
                                            key={option.value}
                                            href={`?sort=${option.value}`}

                                        >
                                            <SelectItem value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        </Link>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </header>
                    <section className="mb-6 mt-2">
                        <h2 className="text-lg font-semibold">Trending</h2>
                    </section>

                    <section className="space-y-4">
                        {allPosts.map((post) => (
                            <PostDetail auth={auth} board={board} post={post} />
                        ))}
                    </section>
                </main>
            </div>
        </Welcome>
    );
};

export default Index;
