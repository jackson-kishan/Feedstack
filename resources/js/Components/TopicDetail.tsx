import { BoardType, TopicType } from "@/types";
import { useState } from "react";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

type Props = {
    topic: TopicType;
    board: BoardType;
};

const TopicDetail = ({ topic, board }: Props) => {
    const [isEditable, setIsEditable] = useState(false);
    const [topicName, setTopicName] = useState(topic.name);

    const handleEdit = (id: number) => {
        setIsEditable(true);

    };
    const handleDelete = (id: number) => {

        const isDelete = window.confirm("Are you sure you want to delete!");

        if(isDelete){
          axios
              .delete(route("topics.destroy",
                {
                  board: board,
                  topic: topic
                }))
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.data);
                })
          }
    };

    return (
        <div
            key={topic.id}
            className="flex items-center gap-2 p-[5px] border rounded-md"
        >
            <div className="p-[5px] ml-2 font-bold">#</div>
            {isEditable ? (
                <Input
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setIsEditable(false);
                            axios
                                .patch(
                                    route("topics.update", {
                                        board: board,
                                        topic: topic,
                                    }),
                                    {
                                        name: topicName,
                                    }
                                )
                                .then((res) => {
                                    console.log(res.data);
                                })
                                .catch((err) => {
                                    console.error(err.data);
                                });

                        }
                    }}
                />
            ) : (
                <span className="font-semiblod">{topic.name}</span>
            )}
            <div className="ml-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-5 w-5 p-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(topic.id)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleDelete(topic.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default TopicDetail;
