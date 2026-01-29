import { BoardType } from "@/types";
import axios from "axios";
import React, { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { FaPlus } from "react-icons/fa";
import { Label } from "./ui/label";
import { useForm } from "@inertiajs/react";

type Props = {
    board: BoardType;
};

const BoardDetail = ({ board }: Props) => {
    const [isEditable, setIsEditable] = useState(false);
    const [boardName, setBoardName] = useState(board.name);

    const [data, setData, processing, post ] = useForm()

    const handleEdit = (id: number) => {
        setIsEditable(true);
    };
    const handleDelete = (id: number) => {
        const isDelete = window.confirm("Are you want to Delete!");

        if (isDelete) {
            axios.delete(route("boards.destroy"));
        }
    };

    const onSubmit: FormEventHandler = () => {

    }


    return (
        <div key={board.id} className="flex items-center">
            <span className="text-muted-foreground text-xl font-bold">
                {board.name}
            </span>

            <div className="ml-6 absolute mt-0 p-8">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-5 w-5 p-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(board.id)}>
                            Edit
                            <Dialog
                                open={isEditable}
                                onOpenChange={setIsEditable}
                            >
                                <DialogTrigger asChild>
                                    Edit
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create Board</DialogTitle>
                                        <form
                                            onSubmit={route('boards.update', {board})}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <Label htmlFor="name">
                                                    Board Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value="data.name"
                                                    // onChange={(e) =>
                                                    //     setData("name", e.target.value)
                                                    // }
                                                    placeholder="Create Awesome Board"
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                Create Board
                                            </Button>
                                        </form>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleDelete(board.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* <Dialog open={isEditable} onOpenChange={setIsEditable}>
                <DialogTrigger asChild>
                    <div className="w-40 h-24 bg-white rounded-lg border shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                        <FaPlus className="h-7 w-7 text-muted-foreground" />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Board</DialogTitle>
                        <form onSubmit="#" className="space-y-4">
                            <div>
                                <Label htmlFor="name">Board Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value="data.name"
                                    // onChange={(e) =>
                                    //     setData("name", e.target.value)
                                    // }
                                    placeholder="Create Awesome Board"
                                />
                            </div>
                            <Button type="submit" disabled="{processing}">
                                Create Board
                            </Button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}
        </div>
    );
};

export default BoardDetail;
