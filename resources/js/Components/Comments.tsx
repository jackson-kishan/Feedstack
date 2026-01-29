import React, {useEffect, useState } from 'react';

import {BoardType, CommentType, PageProps, PostType, User } from '@/types';
import CommandBox from './CommentBox';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import { formatDate } from '@/utils';
import CommentBox from './CommentBox';

type CommentsProps = {
    post: PostType;
    board: BoardType;
}

type CommentProps = {
    comment: CommentType;
    post: PostType;
    board: BoardType;
    parentId?: number;
    onCommentDelete: (commentId: number) => void;
}
const Comments: React.FC<CommentsProps> = ({board, post}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [sort, setSort ] = useState('latest');
  const [isFetching, setIsFetching] = useState(false);

  const fetchComments = async () => {
      setIsFetching(true);

        try {
            const response = await fetch(
                route('post.comments.index' ,{
                    board: board.slug,
                    post: post.slug,
                    sort: sort
                })
            );

            const data = await response.json();
            setIsFetching(false);
            setComments(data);
        } catch (error) {
            console.error('Error Fatching Comments', error);
            // console.log('Error Fatching Comments', error);
            setIsFetching(false);
        }
    }

    useEffect( () => {
        fetchComments();
    }, [sort]);

    const appendToComments = (comment: CommentType) => {
        setComments([comment, ...comments]);
    }

    return (
    <div className="mt-8">
        <div className="mb-8 ml-12">
            <CommandBox board={board} post={post} onComment={appendToComments}/>
        </div>

        {comments.length > 0 && !isFetching && (
           <div className="flex justify-between items-center text-gray-700n ml-12 mb-8 pb-4 border-b">
             <h3 className="text-lg font-semibold">Comments</h3>

             <div className="flex items-center">
                <div className="text-sm mr-2">Sort By</div>
                <select
                 value={sort}
                 className="px-2 min-w-28 text-sm py-1.8 rounded border border-gray-200"
                 onChange={(e) => setSort(e.target.value)}
                 >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                 </select>
             </div>
           </div>
        )}

        <div className="mt-4">
            {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  post={post}
                  board={board}
                  comment={comment}
                  onCommentDelete={() => {
                    setComments(comments.filter((c) => c.id !== comment.id))
                  }}
                />
            ))}
        </div>
    </div>
  );
};

const Comment = ({
    post,
    board,
    comment,
    parentId,
    onCommentDelete
}:CommentProps) => {

    const [showReplyBox, setShowReplyBox] = useState(false);
    const {auth} = usePage<PageProps>().props;

    const ToggleReplyBox = () => {
        setShowReplyBox(!showReplyBox);
    };

    const deleteComment = (commentId: number) => {
        if(!confirm('Are you sure you want to delete this comment?')) {
            return;
    }

    axios
       .delete(route('comment.delete', {id: commentId}))
       .then(() => {
        onCommentDelete(commentId);
       })
        .catch((error) => {
            alert(error.response.data.message);
        });
 };

 return (
    <div className="flex py-3">
        <div className="w-9 mr-3">
            <img
            src=""
            className={classNames(
                'rounded-full h-7 w-7',
                // comment.user?.role === 'admin' ? 'ring-2 ring-indigo-500' : ''
            )}
            />
        </div>

        <div className="flex-1">
            <div className="flex items-center text-sm mb-2">
                <div className="font-semibold">
                    {comment.user?.name}
                </div>
                {comment.status && (
                    <div className="text-sm text-gray-700 ml-2">
                        <span>Mark this post as</span>
                        <span
                         className="uppercase text-xs font-bold text-white px-2 py-1 rounded"
                         style={{ backgroundColor: `${comment.status.color}` }}
                        >
                            {comment.status.name}
                        </span>
                    </div>
                )}
            </div>
            <div
              className="text-sm text-gray-800 mb-2"
              dangerouslySetInnerHTML={{ __html: comment.body }}
              ></div>
              <div className="flex text-xs text-gray-500">
                <div>{formatDate(comment.created_at)}</div>
                <div className="mx-1">.</div>
                <div
                  className="cursor-pointer hover:text-gray-500"
                  onClick={ToggleReplyBox}
                >
                    Reply
                </div>
                {/* .user?.role === 'admin' */}
                {auth && (
                    <>
                      <div className="mx-1">.</div>
                      <div>
                        <button
                          className='text-xs text-red-500'
                          onClick={() => deleteComment(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                )}
              </div>

              {comment.children.length > 0 && (
                <div className="mt-3">
                    {comment.children.map((child) => (
                        <Comment
                          key={child.id}
                          post={post}
                          board={board}
                          comment={child}
                          parentId={comment.id}
                          onCommentDelete={() => {}}
                        />
                    ))}
                </div>
              )}

              {showReplyBox && (
                <div className="mt-4">
                    <CommentBox board={board} post={post} parent={parentId} />
                </div>
              )}
        </div>
    </div>
 );
};

export default Comments;
