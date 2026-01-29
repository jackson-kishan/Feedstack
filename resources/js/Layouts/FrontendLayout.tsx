import { PropsWithChildren, ReactNode } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { BoardType, PageProps, PostType } from "@/types";
import { Button } from "@/Components/ui/button";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import IndexBoard from "@/Pages/Tenant/IndexBoard";
import { CiMedicalClipboard } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import Announcements from "@/Components/Announcements";
import { SearchIdea } from "@/Components/SearchIdea";

type Props = {
    userBoards: BoardType[];
    posts: PostType[];
    board: BoardType;
};

const FrontendLayout = ({
    children,
    userBoards,
    board,
    posts
}: Props & PropsWithChildren<{ children: ReactNode }>) => {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="flex flex-col min-h-[100vh]">
            <Head title="Roadmap" />
            <header className="flex items-center h-[55px] border-b bg-white">
                <div className="flex w-full px-2 justify-between bg-surface-0 border-b border-element-0 top-0">
                    <div className="flex items-center left-5 md:left-1 max-w-1/2 md:max-w-none top-0 h-[55px] flex-row space-x-3">
                        <IndexBoard
                            frontSlug="b"
                            backSlug="idea"
                            board={userBoards}
                        />
                        <div className="hidden md:flex shrink-0">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                <h2 className="hidden sm:inline truncate ml-3 max-w-40 text-1 font-semibold text-text">
                                    Roadmaps
                                </h2>
                            </Link>
                        </div>

                        <div className="hidden md:flex shrink-0">
                            <div className="flex items-center mr-1.5 flex-row space-x-1.5">
                                <div className="h-7 w-px bg-element shrink-0"></div>
                            </div>
                            <div className="flex items-center flex-row space-x-1.5">
                                <NavLink
                                    href={route("frontend.idea", { board })}
                                    active={route().current("frontend.idea")}
                                >
                                    Ideas
                                </NavLink>
                                <NavLink
                                    href={route("frontend.roadmap", { board })}
                                    active={route().current("frontend.roadmap")}
                                >
                                    Roadmap
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center md:mr-7 sm:mr-5 justify-end right-5 md:right-10 bg-surface-0 border-element-10 top-0 h-[50px]">
                        <div className="flex items-center sm:space-x-4 flex-row space-x-2">

                             <SearchIdea posts={posts} board={board} />

                            <div className="flex flex-row space-x-2">
                                {auth.user ? (
                                    <div className="flex items-center justify-between gap-6">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button className="mt-3">
                                                        <Announcements />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <h2>Notification</h2>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <Link href={route("boards.create")}>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button className="mt-1">
                                                            <CiMedicalClipboard className="w-6 h-6" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <h2>Create Board</h2>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </Link>

                                        <Link
                                            href={`/admin/${board.slug}/dashboard`}
                                        >
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button className="mt-3">
                                                            <RxDashboard className="w-6 h-6" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <h2>Dashboard</h2>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Button>
                                            <Link href={route("login")}>
                                                Login
                                            </Link>
                                        </Button>
                                        <Button>
                                            <Link href={route("register")}>
                                                SignUp
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
};

export default FrontendLayout;
