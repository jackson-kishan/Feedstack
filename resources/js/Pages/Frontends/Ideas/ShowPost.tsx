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
} from "@/types";
import { formatTimestamp, getFirstLetter, shortenText } from "@/utils";
import SideNav from "@/Components/SideNav";
import { FaArrowLeft } from "react-icons/fa";
import VoteButton from "@/Components/VoteButton";
import Comments from "@/Components/Comments";
import PostCard from "@/Components/PostCard";

type Props = {
    auth: User;
    post: PostType;
    statuses: StatusType[];
    board: BoardType;
    topics: TopicType[];
    votes: VoteTye[];
    postTopics: PostTopicType[];
    userBoards: BoardType[];
};

const Ideas = ({
    post,
    statuses,
    board,
    postTopics,
    userBoards,
    topics,
    votes,
}: Props) => {
    const back = () => {
        window.history.back();
    };
    console.log("post", post);

    return (
        <FrontendLayout board={board} posts={post} userBoards={userBoards}>
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
        </FrontendLayout>
    );
};

export default Ideas;
