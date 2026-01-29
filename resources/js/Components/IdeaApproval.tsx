import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { BoardType, PostType } from "@/types";
import { Link } from "@inertiajs/react";

type Props = {
   board: BoardType;
   newPosts: PostType[];
   approvePosts: PostType[];
   rejectPosts: PostType[];
}

const IdeaApproval = () => {
    const [activeTab, setActiveTab] = useState<"new" | "approved" | "rejected">("new")
  return (
    <>
  <div className="flex items-center mb-6">
  <div className="flex rounded-md bg-gray-100 p-1">
    <Link
      href={`?sortIdea=new`}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium",
        activeTab === "new" ? "bg-white shadow-sm" : "bg-transparent hover:bg-gray-200",
      )}
      onClick={() => setActiveTab("new")}
    >
      New
    </Link>
    <Link
      href={`?sortIdea=approved`}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium",
        activeTab === "approved" ? "bg-white shadow-sm" : "bg-transparent hover:bg-gray-200",
      )}
      onClick={() => setActiveTab("approved")}
    >
      Approved
    </Link>
    <Link
      href={`?sortIdea=rejected`}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium",
        activeTab === "rejected" ? "bg-white shadow-sm" : "bg-transparent hover:bg-gray-200",
      )}
      onClick={() => setActiveTab("rejected")}
    >
      Rejected
    </Link>
  </div>
</div>

</>);

};

export default IdeaApproval;
