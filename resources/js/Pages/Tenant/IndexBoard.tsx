import React, { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import { cn } from "@/lib/utils";
import { Link, router, usePage } from "@inertiajs/react";
import { BoardType, PageProps } from "@/types";

type Props = {
    board: BoardType[];
    frontSlug: string;
    backSlug: string;
};

const IndexBoard = ({ board, frontSlug = "", backSlug = "" }: Props) => {
    const boardSlug: any = usePage().props.board;

    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center">
            <div className="flex mr-3 ml-6">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between w-[200px]"
                        >
                            {boardSlug.name}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[200px]">
                        <Command>
                            <CommandList>
                                <CommandEmpty>No Framework found.</CommandEmpty>
                                <CommandGroup>
                                    {board.map((b) => (
                                        <CommandItem key={b.id} value={b.name}>
                                            <Link
                                                href={`/${frontSlug}/${b.slug}/${backSlug}`}
                                                className="w-full"
                                            >
                                                {b.name}
                                            </Link>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <div className="p-2 hover:bg-gray-200">
                                    <Link
                                        href={route("boards.create")}
                                        className="font-semibold ml-[33px]"
                                    >
                                        Create Board
                                    </Link>
                                </div>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default IndexBoard;
