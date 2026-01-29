import React, {useState} from 'react';
import ClassNames from 'classnames';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { BoardType, PageProps, PostType } from '@/types';
import classNames from 'classnames';
import { MdKeyboardArrowUp } from "react-icons/md";

type Props = {
  post: PostType;
  board: BoardType;
}

const VoteButton = ({post, board}:Props ) => {

    const {auth} = usePage<PageProps>().props;
    const [hasVote, setHasVote] = useState(post.has_voted);
    const [vote, setVoted] = useState(post.vote);
    const [showModel, setShowModel] = useState(false);

    const toggleVote = (post: PostType) => {
   if(!auth.user) {
    setShowModel(true);
    return;
   }

   axios
   .post(route('post.vote', [board.slug, post.slug]))
   .then((Response) => {
    setVoted(Response.data.vote);
    setHasVote(Response.data.has_voted);
   })
    .catch((error) => {
    //    alert(error.response.data.message);
    console.error(error.response.data.nessage);
    })
    };

  return (
    <>
      <button
        className={classNames(
            'mr-4 flex flex-col h-14 w-14 items-center justify-center rounded-md border bg-gray-50 text-xl font-semibold' ,
            hasVote
             ? "border-indigo-500 bg-indigo-50"
             : "border-gray-300"
        )}
        onClick={() => toggleVote(post)}
      >
        <MdKeyboardArrowUp
          className={classNames(
            'h-5 w-5',
            hasVote ? 'text-indigo-600' : 'text-gray-400'
          )}
        />
       <span className='text-xxs mb-1'>{vote}</span>
      </button>


    </>
  )
}

export default VoteButton;
