import React, { useState } from 'react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { BoardType, PostTopicType, PostType, StatusType, VoteTye } from '@/types';
import { KanbanBoard } from '@/Components/KanbanBoard';

type Props = {
    statuses: StatusType[];
    board: BoardType;
    userBoards: BoardType[];
    status: StatusType;
    posts: PostType[];
    postTopics: PostTopicType[];
    votes: VoteTye[];
}

const HomeRoadmap = ({board, userBoards, status, posts, statuses, votes, postTopics}: Props) => {

    console.log("Board", board);

    const [addingTask, setAddingTask] = useState<StatusType[] | null>(null);
    const [newTaskContent, setTaskContent] = useState("");

  return (
    <FrontendLayout board={board} posts={posts} userBoards={userBoards}>
      <div className='p-8'>
        <KanbanBoard posts={posts} board={board} statuses={statuses} />
      </div>
    </FrontendLayout>
  )
}

export default HomeRoadmap;
