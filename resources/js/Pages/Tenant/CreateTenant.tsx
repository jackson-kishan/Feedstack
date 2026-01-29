import { Link, useForm, Head, usePage } from "@inertiajs/react";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState, FormEventHandler } from "react";
import { BoardType, PageProps } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import BoardDetail from "@/Components/BoardDetail";

type props = {
    board: BoardType[];
    auth: PageProps['auth'];
};

const IndexTenant = ({ auth, board }: props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, setData, post, processing } = useForm({
        name: "",
    });

    console.log(auth);


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("boards.store"));
    };

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 md:gap-4">
            <div className="flex items-center">
                <Head title="Create Room" />
                <h2 className="font-semibold text-lg md:text-2xl">
                    Create Room
                </h2>
            </div>

            <div className="flex flex-wrap gap-4">
                {board.map((b) => (
                    <Link
                        key={b.id}
                        value={b.name}
                        href={`/admin/${b.slug}/dashboard`}
                        className="w-40 h-24 bg-white rounded-lg border shadow-md flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
                    >

                        <span className="text-muted-foreground text-xl font-bold">
                            {b.name}
                        </span>
                    </Link>



                ))}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="w-40 h-24 bg-white rounded-lg border shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                            <FaPlus className="h-7 w-7 text-muted-foreground" />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Board</DialogTitle>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Board Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Create Awesome Board"
                                    />
                                </div>
                                <Button type="submit" disabled={processing}>
                                    Create Board
                                </Button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </main>
    );
};

export default IndexTenant;
