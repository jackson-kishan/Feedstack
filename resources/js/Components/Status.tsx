import { BoardType, StatusType } from "@/types";
import React, { useState } from "react";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import IndexBoard from "@/Pages/Tenant/IndexBoard";

type Props = {
    board: BoardType;
    status: StatusType;
};

const Status = ({ board, status }: Props) => {
    const [isEditable, setIsEditable] = useState(false);
    const [statusName, setStatusName] = useState(status.name);

    const handleEdit = (id: number) => {
        setIsEditable(true);
     };

    const handleDelete = (id: number) => {
        const isDelete = window.confirm("Are you want to Delete it!");

        if(isDelete){
           axios
               .delete(route("statuses.destroy",  {
                board: board,
                status: status,
             }))
             .then((response) => {
                console.log("Status deleted successfully", response.data);
             })
             .catch((error) =>{
               console.log("Error deleting", error.data);
             })
        }
       }


    return (
        <div className="flex items-center gap-2 p-[5px] border rounded-md">
            <div className="p-[6px] ml-2 font-bold border rounded">
                <div
                    className="p-[5px] border rounded-full"
                    style={{ background: status.color }}
                ></div>
            </div>

            <div className="flex items-center justify-between">
                {isEditable ? (
                    <Input
                        value={statusName}
                        onChange={(e) => setStatusName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setIsEditable(false);
                                axios
                                    .patch(
                                        route("statuses.update", {
                                            board: board,
                                            status: status,
                                        }), {
                                          name: statusName
                                        }
                                    )
                                    .then((response) => {
                                        console.log(response.data);
                                    })
                                    .catch((error) => {
                                        console.log(error.data);
                                    });
                            }
                        }}
                    />
                ) : (
                    <span>{status.name}</span>
                )}

                <div className="ml-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-5 w-5 p-0">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => handleEdit(status.id)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleDelete(status.id)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* <button onClick={() => handleEdit(status.id)}>edit</button>
                <button onClick={() => handleDelete(status.id)}>delete</button> */}
        </div>
    );
};

export default Status;
