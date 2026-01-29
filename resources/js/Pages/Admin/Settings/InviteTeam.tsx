import React, { FormEventHandler, useState } from "react";
import Authenticated from "../../../Layouts/AuthenticatedLayoutSetting";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { MoreVertical } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/Components/ui/dialog";
import {
    BoardType,
    UserRoles,
    PageProps,
    PermissionType,
    RoleType,
} from "@/types";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { useForm, usePage } from "@inertiajs/react";
import { getFirstLetter } from "@/utils";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";

type Props = {
    board: BoardType;
    userBoards: BoardType[];
    users: UserRoles[];
    roles: RoleType[];
    auth: PageProps["auth"];
    permissions: PermissionType[];
};

const InviteTeam = ({
    board,
    userBoards,
    users,
    roles,
    permissions,
}: Props) => {
    // const [role, setRole] = useState("Member");
    const [selectedPermission, setSelectedPermission] = useState<number[]>([]);
    const { auth } = usePage<PageProps>().props;

    const handlePermssionCheckbox = (e: any) => {
        const {value, checked} = e.target;

        if(checked) {
            setSelectedPermission([...selectedPermission, value]);
        }
        console.log("permission", value);
    }

    const { data, setData, post, processing } = useForm({
        email: "",
        role: "",
    });

    const submit: FormEventHandler = (e) => {
       e.preventDefault();
       post(route("invite-team.store", {board: board, permission: selectedPermission}));
    }


    return (
        <Authenticated auth={auth} board={board} userBoards={userBoards}>
            <div className="max-w-2xl mx-auto p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold">Invite Team</h1>
                    <div className="sm:max-w-[950px]">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="text-white">
                                    Invite Team
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-2xl font-semibold">
                                        Invite admins to {board.name}
                                    </DialogTitle>
                                    <DialogDescription className="text-center">
                                        Invite a new team member to your company
                                    </DialogDescription>
                                </DialogHeader>
                                    <form onSubmit={submit}>
                                <div className="flex gap-2 mt-4">
                                    <Input
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        placeholder="email@domain.com"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="flex-1"
                                    />
                                    <div className="mx-4 w">
                                    <Select
                                        onValueChange={(id) =>
                                            setData("role", parseInt(id))
                                         }

                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {roles.map((role) => (
                                                    <SelectItem
                                                        key={role.id}
                                                        value={role.id.toString()}
                                                    >
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            className="bg-rose-500 hover:bg-rose-600 text-white"
                                            disabled={processing}
                                        >
                                            Invite
                                        </Button>
                                    </div>
                                </div>


                                <div className="grid grid-cols-2 gap-2 ml-8 p-4">
                                    {permissions.map((p) => (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                name="checkbox"
                                                key={p.id}
                                                value={p.name}
                                                onChange={handlePermssionCheckbox}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                        ? setSelectedPermission([
                                                              ...selectedPermission,
                                                              p.name,
                                                          ])
                                                        : setSelectedPermission(
                                                              selectedPermission.filter(
                                                                  (name) =>
                                                                      name !==
                                                                      p.name
                                                              )
                                                          );
                                                }
                                                }
                                            />
                                            <Label
                                                // htmlFor={topic.id.toString()}
                                                className="cursor-pointer"
                                            >
                                                {p.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                </form>

                                <Alert className="bg-blue-50 border-blue-100 text-blue-800 mt-2">
                                    <AlertDescription>
                                        Admins can change company ownership or
                                        billing settings as well as inviting and
                                        removing other members.
                                    </AlertDescription>
                                </Alert>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <p className="text-muted-foreground mb-8">
                    Add members to your company to help manage ideas.
                </p>

                <div className="space-y-4">
                    <div className="text-sm font-medium">Admins</div>
                    <hr />

                    {users.map((user) => (
                        <div
                            key={user.user.id}
                            className="flex items-center justify-between py-2"
                        >
                            {/* {console.log("user details", user.user)} */}
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8 bg-gray-100">
                                    <AvatarFallback className="text-md font-bold">
                                        {getFirstLetter(user.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">
                                        {user.user.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {user.user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">
                                    {user.user.roles.map((role: any) => (
                                        <div>{role.name}</div>
                                    ))}
                                </span>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">
                                        More actions
                                    </span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default InviteTeam;
