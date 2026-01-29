import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/Components/ui/command";
import { BoardType, PostType } from "@/types";
import { Link } from "@inertiajs/react";

type Props = {
    posts: PostType[];
    board: BoardType;
}


export function SearchIdeaCommand({posts, board}: Props) {
  return (
    <Command className="rounded-lg p-1 border shadow-md md:min-w-[500px]">
      <CommandInput placeholder="Type a command or search..." />
      <hr />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Search Idea..">
            {posts.map((post) => (
                <Link
                key={post.id}
                href={route("idea.show", {
                    board: board.slug,
                    post: post.slug,

                })}
                >
                <CommandItem className="cursor-pointer">
                <div className="flex flex-col py-1 ">
                <p className="text-md font-semibold">{post.title}</p>
                <p>{post.body}</p>
                </div>
              </CommandItem>
              </Link>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
