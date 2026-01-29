import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { BoardType, PageProps, PostTopicType, PostType } from "@/types";
import { formatTimestamp } from "@/utils";
import { Link } from "@inertiajs/react";

type Props = {
    posts: PostType[];
    postTopics: PostTopicType[];
    auth: PageProps["auth"];
    board: BoardType;
};

export default function ContentCard({ posts, postTopics, board, auth }: Props) {


    return (
        <>
            {posts.map((post) => (
                <div className="border rounded-md p-4 bg-white hover:shadow-lg">
                    <div className="space-y-2">
                        {auth.user || !auth.user ? (
                            <Link
                                className="mt-3"
                                key={post.id}
                                href={route("idea.show", {
                                    board: board.slug,
                                    post: post.slug,
                                })}
                            >
                                <h3 className="text-lg font-semibold">
                                    {post.title}
                                </h3>
                            </Link>
                        ) : auth.user.roles.includes([
                              "Admin",
                              "Contributor",
                          ]) ? (
                            <Link
                                className="mt-3"
                                key={post.id}
                                href={route("frontend.idea.show", {
                                    board: board.slug,
                                    post: post.slug,
                                })}
                            >
                                <h3 className="t ext-lg font-semibold">
                                    {post.title}
                                </h3>
                            </Link>
                        ) : null}

                        <p className="text-sm text-gray-600">{post.body}</p>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                    {post.created_by.name
                                        .substring(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                                {post.created_by.name}
                            </span>
                        </div>
                        <div className="flex ml-2">
                            <span className="flex items-center gap-1 text-sm font-medium">
                                {postTopics.map((topic: any) => (
                                    <span key={topic.id}>
                                        # {topic.topic.name}
                                    </span>
                                ))}
                            </span>
                        </div>
                        <span className="text-xs text-gray-400 ml-auto">
                            {" "}
                            {formatTimestamp(post.created_at)}
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
}
