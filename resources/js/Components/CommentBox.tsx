import React, { FormEvent, useState } from 'react';
import { Button } from './ui/button';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import {PageProps, PostType, CommentType, BoardType } from '@/types';

type Props = {
  post: PostType;
  board: BoardType;
  parent?: number;
  onComment?: (comment: CommentType) => void;
};

const CommentBox = ({post,board, parent, onComment}: Props) => {
    const { auth } = usePage<PageProps>().props;
    const [isFocused, SetIsFocused] = useState(false);
    const [isProcessing, SetIsProcessing] = useState(false);
    const [rows, SetRows] = useState(1);
    const [form, setForm] = useState<{
        body: string;
        post_id: number;
        board_id: number;
        parent_id: number;
    }>({
      body: "",
      post_id: post.id,
      board_id: board.id,
      parent_id: parent || 0
    });

    const showButton = isFocused || form.parent_id !== 0 || form.body.length > 0;

    const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       const textarea = e.target;
       const lineHight = parseInt(
        window.getComputedStyle(textarea).lineHeight,
        10
       );

       const padding =
       parseInt(window.getComputedStyle(textarea).paddingTop, 10) +
       parseInt(window.getComputedStyle(textarea).paddingBottom, 10);

       //Resetting the height to 'auto' allow the scrollHeight to corrently represent the content height
       textarea.style.height = 'auto';
       const contentHeight = textarea.scrollHeight - padding;

       //Calculate the number of rows (consider both new lines and warapper text)
       let rows = Math.floor(contentHeight / lineHight);

       //Define minimum and maximum number of rows
       const minRows = 1;
       const maxRows = 10;

       //Clamp the rows value between the minimum and maximum
       rows = Math.max(minRows, Math.min(rows, maxRows));

       SetRows(rows);

       setForm({
          ...form,
          body: textarea.value,
       });
     };

     const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
       e.preventDefault();

       createComment();
     };

     const createComment = () => {
        if(isProcessing){
            return;
        }

        SetIsProcessing(true);

        axios
           .post(route('post.comment', [board,post]), form)
           .then((response) => {
              setForm({
                ...form,
                body: '',
              });

              if(onComment) {
                onComment(response.data);
              }
           })
           .catch((error) => {
            //  alert(error.response.data.message);
            console.log(error.response.data.message);
           })
           .finally(() => {
            SetIsProcessing(false);
           });
     }


  return (
    <form
    className='border border-gray-300 dark:border-gray-700 rounded '
    onSubmit={onFormSubmit}
    >
        <textarea
          className='w-full border-0 text-sm px-3 py-2 mt-1 focus:ring-0'
          autoComplete='off'
          rows={rows}
          value={form.body}
          onFocus={() => SetIsFocused(true)}
          onBlur={() => SetIsFocused(false)}
          placeholder='Write a Comment...'
          onChange={onTextareaChange}
          onKeyDown={(e) => {
            if(e.metaKey && e.key === "Enter") {
                createComment();
            }
          }}
        >
        </textarea>

        {showButton && (
         <div className="flex border-t border-gray-300 px-3 py-2 justify-between items-center">
           <div className="text-xs text-gray-500">
            {parent ? (
                <span>&nbsp;</span>
            ): (
               <span>
                The post author and the voters will get an email notification.
               </span>
            )}
           </div>
           <div className="">
            <Button
              type='submit'
              disabled={isProcessing || form.body === '' || !auth.user }
            >
              Submit
            </Button>
           </div>
         </div>
        )}

    </form>
  )
}

export default CommentBox;
