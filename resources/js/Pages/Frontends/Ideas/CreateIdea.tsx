import { FormEventHandler, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue
 } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { BoardType, PageProps, StatusType, TopicType, User } from "@/types";
import axios from "axios";
// import BoardRoadmap from "../Partials/BoardRoadmap";

type Props = {
    auth: PageProps['auth'];
    topics: TopicType[];
    board: BoardType;
    statuses: StatusType[];
};

const CreateIdea = ({ auth, topics, board, statuses }: Props) => {
    const [open, setOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<number[]>([]);


    const handleCheckboxChange = (e: any) => {
        const { value, checked } = e.target;

        if (checked) {
            if (selectedTopic.length < 3) {
                setSelectedTopic([...selectedTopic, parseInt(value)]);
            } else {
                e.target.checked = false;
            }
        } else {
            setSelectedTopic(
                selectedTopic.filter((id) => id !== parseInt(value))
            );
        }
    };

    const { data, setData, post, processing } = useForm({
        title: "",
        body: "",
        status_id: NaN,
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("frontend.idea.store", {board: board, topics: selectedTopic }));
        setOpen(false);
        location.reload();
    };

     return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>Submit Idea</Button>
            </SheetTrigger>
            <SheetContent className="w-[650px]  overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>Tell us Your Idea!</SheetTitle>
                    <SheetDescription>
                        Share your innovative idea with us. We'd love to hear
                        them!
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={submit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="summary">
                            One sentence that summarizes your Idea
                        </Label>
                        <Input
                            id="summary"
                            name="title"
                            value={data.title}
                            placeholder="Enter your idea sumary"
                            onChange={(e) => setData("title", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Why your idea is useful, who would benefit and how
                            it should work?{" "}
                        </Label>
                        <Textarea
                            id=""
                            name="body"
                            value={data.body}
                            placeholder="Description your idea in detail"
                            className="min-h-[100px]"
                            onChange={(e) =>
                                setData("body", e.target.value)
                            }
                        />
                    </div>

               {!auth.user ?
               (
                <div></div>
               )
               : (
                auth.user.roles.includes("Viewer")
                ?
                (
                    <div></div>
                )
                :
                (
                    <div className="space-y-2">
                    <Select onValueChange={(id) => setData('status_id', Number(id))}>
                      <SelectTrigger>
                         <SelectValue placeholder="-- Select Status --" />
                      </SelectTrigger>
                      <SelectContent>
                           <SelectGroup>
                         {statuses.map((status) => (
                           <SelectItem
                             key={status.id}
                             value={status.id.toString()}
                         >
                             {status.name}
                      </SelectItem>
                         ))}
                       </SelectGroup>

                      </SelectContent>
                    </Select>
                 </div>

                )
               )

               }


                    <div className="space-y-2">
                        <Label>
                            Select Topics For Your Great Idea
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                            {topics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        name="checkbox"
                                        value={topic.id}
                                        onChange={handleCheckboxChange}
                                        onCheckedChange={(checked) => {
                                            return checked
                                                ? setSelectedTopic([
                                                      ...selectedTopic,
                                                      topic.id,
                                                  ])
                                                : setSelectedTopic(
                                                      selectedTopic.filter(
                                                          (id) =>
                                                              id !== topic.id
                                                      )
                                                  );
                                        }}
                                    />
                                    <Label
                                        htmlFor={topic.id.toString()}
                                        className="cursor-pointer"
                                    >
                                        {topic.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {auth ? (
                        null
                    ) : (
                        <div className="grid grid-cols-2 gap-4 mt-3 p-3">
                            <div className="space-y-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <Checkbox id="consent" />
                        <Label htmlFor="consent" className="text-sm">
                            I consent to my information being stored and used
                            according to the Privacy Policy
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="flex items-end justify-end"
                        disabled={processing}
                    >
                        Submit Idea
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default CreateIdea;
