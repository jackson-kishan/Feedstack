import React, { FormEventHandler, useEffect, useState, } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayoutSetting';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/Components/ui/card';
import { BoardType, TopicType } from '@/types';
import TopicDetail from '@/Components/TopicDetail';

type Props = {
    board: BoardType;
    userBoards: BoardType[];
    topics: TopicType[];
}

const Topic = ({board, topics, userBoards}: Props) => {
    // const [topics, setTopics] = useState<TopicType[]>([]);

    // const fetchTopics = async () => {

    //     try {
    //         const response = await fetch(route("topics.show")
    //       );

    //       const data = await response.json();
    //       setTopics(data);
    //       console.log(data);
    //     } catch (err: any) {
    //         console.error(err.data);
    //     }
    // }

    // useEffect(() => {
    //     fetchTopics();
    // }, []);


    const { data, setData, post, processing} = useForm({
        name: '',
    });


    const Submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('topics.store', {board}));
    }

  return (
    <Authenticated
       board ={board}
       userBoards={userBoards}
       >
        <Head title='Topic' />
      <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle>Topics</CardTitle>
        <CardDescription>Add Topic so that user can tag them when creating Idea.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={Submit}>

        <div className="flex gap-2">
          <Input
            id='name'
            name='name'
            value={data.name}
            placeholder="Topic Name"
            onChange={(e) => setData('name', e.target.value)}
          />
         <Button disabled={processing}>Add Topic</Button>
        </div>
        </form>

        <div className="space-y-2">
          {topics.map((topic) => (
           <TopicDetail key={topic.id} board={board} topic={topic} />
          ))}
        </div>

        {/* <div className="space-y-4">
          <div className="border p-3">
           <div className="font-bold">Remember: Private Topic are Paid Feature</div>
           <div className='text-muted-foreground'>Private Topic are part of the privacy Add-on.</div>
          </div>
        </div> */}
      </CardContent>
    </Card>

    </Authenticated>
  )
}

export default Topic;
