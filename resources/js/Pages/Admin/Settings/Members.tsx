import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { BoardType, UserRoles } from "@/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
    board: BoardType;
    userBoards: BoardType[];
    userRoles: UserRoles[];

};
const Members = ({ board, userBoards, userRoles }: Props) => {

    console.log(userRoles);
    return (
        <Authenticated board={board} userBoards={userBoards}>
            <main className="flex-1 py-5 lg:px-[50px] sm:px-[150px]">
                <div className="max-w-2xl mx-auto p-2 space-y-5">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-semibold">Board Member</h1>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>UserName</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {userRoles.map((user) =>
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                               {user.user.name}
                            </TableCell>
                            <TableCell>{user.user.email}</TableCell>
                            <TableCell>{user.role.name}</TableCell>
                            <TableCell className="text-right">
                               <div className="flex items-end justify-end gap-3">
                                <FaEdit className="h-5 w-5 text-green-500" />
                                <RiDeleteBin6Line className="h-5 w-5 text-rose-500" />
                               </div>
                            </TableCell>
                        </TableRow>
                           )}
                    </TableBody>
                </Table>
            </main>
        </Authenticated>
    );
};

export default Members;
