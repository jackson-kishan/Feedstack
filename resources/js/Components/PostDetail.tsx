import React, { useState } from "react";
import { BoardType, PageProps, PostType } from "@/types";
import { Button } from "./ui/button";
import { formatTimestamp, shortenText } from "@/utils";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { FaCheckCircle } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";
import VoteButton from "./VoteButton";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

type Props = {
    post: PostType;
    board: BoardType;
    auth: PageProps["auth"];
};

const PostDetail = ({ auth, post, board }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleApprove = (post: any) => {
        axios.patch(route("idea.approve", {board: post.board_id,post: post.id}))
        .then((response:any) => console.log(response.data.message))
        .catch((err) => console.error(err.data.message))
        // console.log(post);
    };

    // const approveSubmit = (e:any) => {
    //   e.prevenDefault();
    //   router.put("idea.approve", {post: post});
    // }

    const handleReject = (id: number) => {
        axios.put(route("idea.reject", [post]));
    };
    return (
        <div className="p-4 border rounded my-2">
            <div className="flex items-center space-x-4">
                <VoteButton post={post} board={board} />
                <div className="flex-1">
                    {auth.user || !auth.user ? (
                      <Link
                      className="mt-3"
                      onClick={() => setIsOpen(true)}
                      key={post.id}
                      href={route("idea.show", {
                          board: board.slug,
                          post: post.slug,
                      })}
                  >
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                   </Link>
                   ) : ( auth.user.roles.includes(["Admin", "Contributor"]) ?
                   (
                    <Link
                    className="mt-3"
                    onClick={() => setIsOpen(true)}
                    key={post.id}
                    href={route("frontend.idea.show", {
                        board: board.slug,
                        post: post.slug,
                    })}
                >
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                </Link>
                   ) : null )}

                    {/* {auth.user.roles.includes("Viewer") ? (
                        <Link
                        className="mt-3"
                        onClick={() => setIsOpen(true)}
                        key={post.id}
                        href={route("idea.show", {
                            board: board.slug,
                            post: post.slug,
                        })}
                    >
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                    </Link>
                    ) :
                    (
                        <Link
                        className="mt-3"
                        onClick={() => setIsOpen(true)}
                        key={post.id}
                        href={route("frontend.idea.show", {
                            board: board.slug,
                            post: post.slug,
                        })}
                    >
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                    </Link>
                    )
                     } */}



                    {/* <h3 className="text-lg font-semibold">{post.title}</h3> */}
                    <p className="text-sm text-gray-600 p-2">
                        {shortenText(post.body)}
                    </p>
                    <div className="flex justify-between">
                        <div className="flex items-center mt-2 space-x-2 text-sm text-gray-500">
                            <span>{post.created_by.name}</span>
                            <span>.</span>
                            <span>{formatTimestamp(post.created_at)}</span>
                            <span>.</span>
                            {post.status ? (
                                <div>
                                    <span
                                        className="inline-block w-2 h-2 rounded-full"
                                        style={{
                                            background: post.status.color,
                                        }}
                                    />
                                    <span>{post.status.name}</span>
                                </div>
                            ) : (
                                <div></div>
                            )}

                            <span role="img" aria-label="thumbs up">
                                👍
                            </span>
                            <span>{post.topics.name}</span>
                            <span role="img" aria-label="link">
                                🔗
                            </span>
                        </div>

                        {!auth.user ? (
                            <div></div>
                        ) : auth.user.roles.includes("Viewer") ? (
                            <div></div>
                        ) : (
                            <div className="flex items-end justify-end">
                                <div className="flex justify-between gap-2">
                                    <button
                                        onClick={() => handleApprove(post)}
                                    >
                                        <FaCheckCircle className="inline-flex h-[20px] w-[20px] m-auto ml-1 text-green-600 hover:text-green-400 cursor-pointer" />
                                        <p className="text-[10px] mr-4">
                                            accept
                                            {post.post_approval}
                                        </p>
                                    </button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button>
                                                <RiCloseCircleFill className="inline-flex h-6 w-6 m-auto text-red-600 hover:text-red-400 cursor-pointer" />
                                                <p className="text-[10px] mr-4">
                                                    reject
                                                </p>
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete your
                                                    account and remove your data
                                                    from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        handleReject(post.id)
                                                    }
                                                >
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    {/* <Link
                                        href={route("idea.reject", {
                                            board: board,
                                            post: post,
                                        })}
                                    >
                                        <RiCloseCircleFill className="inline-flex h-6 w-6 m-auto text-red-600 hover:text-red-400 cursor-pointer" />
                                        <p className="text-[10px] mr-4">
                                            reject
                                        </p>
                                    </Link> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
