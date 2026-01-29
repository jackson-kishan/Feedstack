import { Separator } from "@/Components/ui/separator";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { BoardType } from "@/types";
import React, { useState } from "react";
import { Content } from "@tiptap/react"
import { MinimalTiptapEditor } from '@/Components/minimal-tiptap'

type Props = {
    board: BoardType;
    userBoards: BoardType[];
};

const HomeAnnouncement = ({ board, userBoards }: Props) => {
    const [value, setValue] = useState<Content>("")
    return (
        <Authenticated board={board} userBoards={userBoards}>


            <main className="flex-1 py-5 lg:px-[50px] sm:px-[150px]">
                <div className="max-w-2xl mx-auto p-2 space-y-5">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-semibold">Annoucement</h1>
                        <Separator />

{/* 
        <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="html"
      placeholder="Enter your description..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-hidden"
    /> */}
                    </div>
                </div>
            </main>
        </Authenticated>
    );
};

export default HomeAnnouncement;
