import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import {  SearchIdeaCommand } from "./SearchIdeaCommand";
import { BoardType, PostType } from "@/types";

type Props = {
    posts: PostType[];
    board: BoardType;
}

export function SearchIdea({posts, board}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-none">
        <DialogTitle className="p-3 mt-2">Search Idea...</DialogTitle>
        < SearchIdeaCommand board={board} posts={posts} />
      </DialogContent>
    </Dialog>
  )
}
