import FrontendLayout from "@/Layouts/FrontendLayout";
import { Button } from "@/Components/ui/button";
import {
    StatusType,
    User,
    TopicType,
    PostType,
    BoardType,
    VoteTye,
    PostTopicType,
    PageProps,
} from "@/types";
import { formatTimestamp, getFirstLetter, shortenText } from "@/utils";
import SideNav from "@/Components/SideNav";
import { FaArrowLeft } from "react-icons/fa";
import VoteButton from "@/Components/VoteButton";
import Comments from "@/Components/Comments";
import Welcome from "../Welcome";
import PostCard from "@/Components/PostCard";

type Props = {
    auth: PageProps["auth"];
    post: PostType;
    posts: PostType[];
    statuses: StatusType[];
    board: BoardType;
    topics: TopicType[];
    votes: VoteTye[];
    postTopics: PostTopicType[];
};

const ShowIdea = ({
    auth,
    post,
    statuses,
    board,
    postTopics,
    topics,
    votes,
    posts,
}: Props) => {
    const back = () => {
        window.history.back();
    };

    return (
        <Welcome posts={posts} board={board} auth={auth}>
            <div className="flex main-h-screen">
                <SideNav statuses={statuses} topics={topics} />
                <main className="flex-1 py-5 md:py-10 px-[120px]">
                    <header className="flex items-center">
                        <h1 className="text-2xl font-bold">Requested Idea</h1>
                    </header>
                    <section className="mb-6 mt-4">
                        <a onClick={() => back()}>
                            <Button>
                                <FaArrowLeft className="mr-2" />
                                Back
                            </Button>
                        </a>
                    </section>

                    <PostCard post={post} board={board} votes={votes} postTopics={postTopics}  />

                </main>
            </div>
        </Welcome>
    );
};

export default ShowIdea;
