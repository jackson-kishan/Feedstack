import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { Badge } from "./ui/badge";
import { ColumnId } from "./KanbanBoard";
import {
    BoardType,
    PageProps,
    PostTopicType,
    PostType,
    StatusType,
    VoteTye,
} from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { formatTimestamp, getFirstLetter, shortenText } from "@/utils";
import PostDetail from "./PostDetail";
import { Link, usePage } from "@inertiajs/react";
import VoteButton from "./VoteButton";
import Comments from "./Comments";
import PostCard from "./PostCard";

interface TaskCardProps {
    task: PostType;
    isOverlay?: boolean;
    board: BoardType;
    auth: PageProps["auth"];
}

export type TaskType = "Task";

export interface TaskDragData {
    type: TaskType;
    task: PostType;
}

export function TaskCard({ task, isOverlay, board }: TaskCardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        } satisfies TaskDragData,
        attributes: {
            roleDescription: "Task",
        },
    });
        const { auth } = usePage<PageProps>().props;

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    const variants = cva("", {
        variants: {
            dragging: {
                over: "ring-2 opacity-30",
                overlay: "ring-2 ring-primary",
            },
        },
    });

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={variants({
                dragging: isOverlay
                    ? "overlay"
                    : isDragging
                    ? "over"
                    : undefined,
            })}
        >
            <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
                <Button
                    variant={"ghost"}
                    {...attributes}
                    {...listeners}
                    className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
                >
                    <span className="sr-only">Move task</span>
                    <GripVertical />
                </Button>
            </CardHeader>
            <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
                {auth.user || !auth.user ? (
                    <Link
                        className="mt-3"
                        // key={task.id}
                        href={route("idea.show", {
                            board: board.slug,
                            post: task.slug,
                        })}
                    >
                        <div className="flex flex-row w-full cursor-pointer">
                            <button className="mr-4 flex flex-col h-12 w-12 items-center justify-center rounded-md border bg-gray-50 text-xl font-semibold">
                                <span className="text-xxs mb-1">
                                    {task.vote}
                                </span>
                            </button>
                            <p className="text-lg mt-2  hover:underline">
                                {shortenText(`${task.title}`, 6)}
                            </p>
                        </div>
                    </Link>
                ) : auth.user.roles.includes(["Admin", "Contributor"]) ? (
                    <Link
                        className="mt-3"
                        // key={task.id}
                        href={route("frontend.idea.show", {
                            board: board.slug,
                            post: task.slug,
                        })}
                    >
                        <div className="flex flex-row w-full cursor-pointer">
                            <button className="mr-4 flex flex-col h-12 w-12 items-center justify-center rounded-md border bg-gray-50 text-xl font-semibold">
                                <span className="text-xxs mb-1">
                                    {task.vote}
                                </span>
                            </button>
                            <p className="text-lg mt-2  hover:underline">
                                {shortenText(`${task.title}`, 6)}
                            </p>
                        </div>
                    </Link>
                ) : null}
            </CardContent>
        </Card>
    );
}
