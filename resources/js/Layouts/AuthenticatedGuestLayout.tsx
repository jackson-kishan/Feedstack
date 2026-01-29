import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link, Head, usePage } from "@inertiajs/react";
import { IoSearchSharp } from "react-icons/io5";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { LuUser } from "react-icons/lu";
import { PageProps, BoardType } from "@/types";
import SideNavLink from "@/Components/SideNavLink";
import IndexBoard from "@/Pages/Tenant/IndexBoard";
import Can from "@/Components/Can";
import { CiMedicalClipboard } from "react-icons/ci";
import { FaSearchPlus } from "react-icons/fa";
import { checkRole } from "@/utils";

type Props = {
    board: BoardType;
};

export default function AuthenticatedGuest({
    children,
    board
}: Props & PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage<PageProps>().props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");


    return (
        <div className="flex flex-col min-h-[100vh]">
            <Head title="Dashboard" />
            <header className="ml-10 h-[55px] border-b bg-white">
                <div className="flex justify-between bg-surface-0 border-b border-element-0 top-0">
                    <div className="flex items-center left-5 md:left-1 max-w-1/2 md:max-w-none top-0 h-[55px] flex-row space-x-3">
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
                                    href={route("idea.index", { board })}
                                    active={route().current("idea.index")}
                                >
                                    Ideas
                                </NavLink>

                                <NavLink
                                    href="#"
                                    // href={route("idea.roadmap", { board })}
                                    active={route().current("idea.roadmap")}
                                >
                                    Roadmap
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center ml-[250px] sm:mr-5 justify-end right-5 md:right-10 bg-surface-0 border-element-10 top-0 h-[50px]">
                        <div className="flex items-center sm:space-x-4 flex-row space-x-2">
                            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">


                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full hover:border-2"
                                        >
                                            <LuUser className="h-6 w-6" />

                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            {auth.user.name}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem>
                                            <Link
                                                className="w-full"
                                                href={route("user.profile.edit", {
                                                    board,
                                                })}
                                            >
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <Link
                                                href={route("my-content", {
                                                    board,
                                                })}
                                                className="w-full"
                                            >
                                                My Content
                                            </Link>
                                        </DropdownMenuItem>

                                        {checkRole(auth.user.roles) ?
                                          (
                                            <DropdownMenuItem>
                                            <Link
                                                href={route("dashboard", {
                                                    board,
                                                })}
                                                className="w-full"
                                            >
                                                Admin View
                                            </Link>
                                        </DropdownMenuItem>
                                          ) :
                                          (
                                            <div></div>
                                          )
                                        }


                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link
                                                method="post"
                                                className="w-full"
                                                href={route("logout", {board})}
                                            >
                                                Logout
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
                    <div className="hidden border-r lg:block">
                        <div className="flex flex-col gap-2">
                            <div className="flex-1 py-4">
                                <nav className="grid items-start px-4 text-sm font-medium ">

                                    <SideNavLink
                                        href={route("user.profile.edit", { board })}
                                        active={route().current("profile.edit")}
                                    >
                                        Profile
                                    </SideNavLink>
                                    <SideNavLink
                                        href={route("my-content", { board })}
                                        active={route().current("my-content")}
                                    >
                                        My Content
                                    </SideNavLink>

                                </nav>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-1 flex-col gap-2 md:gap-8 md:p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
