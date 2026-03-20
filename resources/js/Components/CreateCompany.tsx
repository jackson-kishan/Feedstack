import { Link, useForm, Head, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import {  PageProps } from "@/types";
import { FormEventHandler } from "react";

type props = {
    auth: PageProps["auth"];
};

const CompanyForm = ({ auth }: props) => {
    const { data, setData, post, processing } = useForm({
        name: "",
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("boards.store"));
    };
    console.log(auth);

    return (
        <form onSubmit={submit} className="flex flex-col gap-6">
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                        Create your Awesome Board
                    </h1>
                </div>
                <Field>
                    <FieldLabel htmlFor="name">Full Board Name</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        placeholder="Enter Board Name"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                </Field>
                <Field>
                    <Button type="submit" disabled={processing}> Create Board </Button>
                </Field>
            </FieldGroup>
        </form>
    );
};

export default CompanyForm;
