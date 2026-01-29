import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MdOutlineNotifications } from "react-icons/md";

const Notification = () => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:border-2"
                >
                    <MdOutlineNotifications className="h-6 w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 max-h-[400px] overflow-auto">
                <div className="grid gap-4 p-4">
                     <div className="flex flex-col space-y-1.5 p-5 border-b">
                        <h3 className="text-2xl fonr-semibold leading-none tracking-tight">
                            Notification
                        </h3>
                        <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>
                     </div>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">
                                New order received
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                5 min ago
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">
                                Payment processed
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                10 min ago
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">Item shipped</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                1 hour ago
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                        Mark All as Read
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notification;
