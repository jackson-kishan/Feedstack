import React, { FormEventHandler, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "./ui/button";
import InputLabel from "./InputLabel";
import { Input } from "./ui/input";
import InputError from "./InputError";
import Checkbox from "./Checkbox";
import { Link, useForm } from "@inertiajs/react";

const Login = ({
    status,
}: {
    status?: string;
}) => {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: "",
        password: "",
        remember: false,
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Login</Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-none">
                    <DialogTitle className="p-3 mt-2">Login</DialogTitle>

                    <form
                     onSubmit={submit}
                     className="p-3"
                     >
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full shadow-lg"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full shadow-lg"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route("password.request")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>


                            <Button className="ms-4" disabled={processing}>
                                Log In
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Login;
