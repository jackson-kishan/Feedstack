import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import {
     Dialog,
     DialogTrigger,
     DialogContent,
     DialogTitle
 } from "./ui/dialog";
import { BoardType, CommentType, PostType } from "@/types";
import { getFirstLetter } from "@/utils";
import { Link } from "@inertiajs/react";
import { Button } from "./ui/button";


type Props = {
    post: PostType;
    comment: CommentType;
    board: BoardType;
}

export function IdeaCard({post, board}: Props) {
  return (
    <div className="border rounded-md p-4 bg-white">
      <div className="space-y-2">
        <div className="flex items-center">
        <h3 className="font-medium">{post.title}</h3>
        <span className="text-xs text-gray-400 ml-auto">
            {/* {timeAgo} */} 2 day ago
        </span>
        </div>
        <p className="text-sm text-gray-600">{post.body}</p>
      </div>

      <div className="flex items-center mt-4">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {/* {getFirstLetter(post.created_by.name)} */}
              K
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.created_by.name}</span>
        </div>
        {/* <div className="flex ml-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-sm text-gray-500 ml-1">
              {tag}
            </span>
          ))}
        </div> */}
        <div className="ml-auto flex px-4 gap-1">

         <Dialog>
            <DialogTrigger asChild>
              <FaCheckCircle className="flex h-[20px] w-[20px] m-auto text-green-600 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <div className="flex items-center justify-center bg-gray-200 p-5 m-4">
                    <div className="flex flex-col">
                    <h2 className="text-xl mb-5">Are you want to Approve!</h2>
                    <div className="flex justify-between">
                    <Link
                      href={route('ideas.approve.store', {post: post.post_approval, board: board})}
                      className="inline-flex items-center justify-center bg-green-500 h-9 px-4 py-2 rounded text-center text-primary-foreground shadow hover:bg-green-400"
                     >
                        yes
                    </Link>
                    <Link
                      href={route('ideas.reject.store', {post: post.post_approval, board: board})}
                      className="inline-flex items-center justify-center bg-green-500 h-9 px-4 py-2 rounded text-center text-primary-foreground shadow hover:bg-green-400"
                     >
                        yes
                    </Link>

                    </div>

                    </div>


                </div>
            </DialogContent>
         </Dialog>

        <RiCloseCircleFill className="h-6 w-6 text-red-600" />
      </div>
      </div>
    </div>
  )
}

