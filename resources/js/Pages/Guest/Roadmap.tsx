import Welcome from "../Welcome";
import { BoardType, CommentType, PageProps, PostType, StatusType, TopicType } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import SideNav from "@/Components/SideNav";
import CreateIdea from "../Frontends/Ideas/CreateIdea";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";
import PostDetail from "@/Components/PostDetail";
import { KanbanBoard } from "@/Components/KanbanBoard";

type Props = {
    board: BoardType;
    auth: PageProps['auth'];
    posts: PostType[];
    comments: CommentType[];
    statuses: StatusType[];
}

const Roadmap = ({ auth, board, posts, statuses }: Props) => {
    // const [statuses, setStatuses] = useState<StatusType[]>([]);
    // const [topics, setTopics] = useState<TopicType[]>([])
    // ;
    // const [allPosts, setAllPosts] = useState<PostType[]>([]);
    // // const [board, setBoard] = useState<BoardType>();
    // // const auth = usePage<PageProps>().props;

    // const fetchBoard = async () => {
    //     const response = await fetch(route("idea.index", { board: board }));
    //     console.log("response", response);
    //     const data = await response.json();
    //     setStatuses(data.status);
    //     setTopics(data.topics);
    //     setAllPosts(data.posts);
    //     // setBoard(data.board);
    // };

    // useEffect(() => {
    //     fetchBoard();
    // }, []);


    return (
        <Welcome board={board} auth={auth} posts={posts}>
          <div className='p-8'>
                  <KanbanBoard board={board} posts={posts} statuses={statuses} />
                </div>

        </Welcome>
    );
};

export default Roadmap;
