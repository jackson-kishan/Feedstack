import React, { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { MdOutlineAnnouncement } from "react-icons/md";

const Announcements = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    {/* <Button>Submit Idea</Button> */}
                    <MdOutlineAnnouncement className="w-6 h-6 mb-2" />
                </SheetTrigger>
                <SheetContent className="w-[650px]  overflow-y-scroll">
                    <SheetHeader>
                        <SheetTitle>Announcement</SheetTitle>
                        <SheetDescription>

                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Announcements;
