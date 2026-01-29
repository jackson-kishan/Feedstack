import React from "react";
import VoteButton from "./VoteButton";
import { BoardType, PostTopicType, PostType, VoteTye } from "@/types";
import { formatTimestamp, getFirstLetter } from "@/utils";
import Comments from "./Comments";

type Props = {
    post: PostType;
    board: BoardType;
    votes: VoteTye[];
    postTopics: PostTopicType[];
}

const PostCard = ({post, board, votes, postTopics}: Props) => {
    return (
        <>
            <section className="space-y-4">
                <div className="flex flex-1 flex-col overflow-auto">
                    <div className="flex border-b p-6">
                        <VoteButton post={post} board={board} />

                        <div className="flex-1">
                            <h3 className="mb-1 text-lg font-semibold">
                                {post.title}🚀
                            </h3>

                            <p className="mt-4 text-gray-600">{post.body}</p>
                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                                <span>{post.created_by.name}</span>
                                <span>•</span>
                                <span>{formatTimestamp(post.created_at)}</span>
                                <div className="flex items-center">
                                    <div className="relative shrink-0 grow-0 inline-flex">
                                        <span
                                            role="button"
                                            tabIndex={0}
                                            className="outline-none cursor-pointer"
                                        >
                                            <div className="flex items-center flex-row space-x-1.5">
                                                <div className="flex -space-x-1">
                                                    <div
                                                        className="flex relative shrink-0 grow-0 items-center justify-center overflow-hidden bg-pink-100 border-[1px] border-pink-400 rounded-full text-brand font-medium bg-surface-0 bg-center bg-no-repeat select-none bg-cover w-6 h-6 text-0.75"
                                                        title="elbephat"
                                                    >
                                                        {votes ? (
                                                            votes.map((v) => (
                                                                <div
                                                                    key={v.id}
                                                                    className="flex relative shrink-0 grow-0 items-center justify-center overflow-hidden bg-pink-100 border-[1px] border-pink-400  rounded-full text-brand font-medium bg-surface-0 bg-center bg-no-repeat select-none bg-cover w-6 h-6 text-0.75"
                                                                >
                                                                    <span className="">
                                                                        {getFirstLetter(
                                                                            v
                                                                                .user
                                                                                .name
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div></div>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* <p className="leading-none text-0.75 font-medium text-text-medium text-gray-600">
                                                                 +30
                                                             </p> */}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="flex items-center gap-1 text-sm font-medium">
                                    {postTopics.map((topic: any) => (
                                        <span key={topic.id}>
                                            # {topic.topic.name}
                                        </span>
                                    ))}
                                </span>
                                {!post.status ? (
                                    <div></div>
                                ) : (
                                    <span
                                        className={`rounded-md px-2 py-0.5 text-sm ${post.status.color}`}
                                    >
                                        {post.status.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-col space-y-8">
                        <Comments board={board} post={post} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default PostCard;
