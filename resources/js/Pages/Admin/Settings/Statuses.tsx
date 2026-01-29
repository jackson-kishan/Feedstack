import React, { FormEventHandler, useState, } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Authenticated from '../../../Layouts/AuthenticatedLayoutSetting';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import Checkbox from '@/Components/Checkbox';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/Components/ui/card';
import { BoardType, StatusType } from '@/types';
import axios from 'axios';
import Status from '@/Components/Status';


type Props = {
 board: BoardType;
 userBoards: BoardType[];
 statuses: StatusType[];
}

type StatusProps = {
    status: (statusId: number) => void;
}

const Statuses = ({board, userBoards, statuses }: Props) => {

    const { data, setData, post, processing } = useForm({
        name: '',
        color: '#0033cc',
    });

    const submit: FormEventHandler = (e) => {
      e.preventDefault();

      post(route('statuses.store', {board}));
    }

    // axios
    //     .put(route('statuses.update', [board]))
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.error(error.response.data.message);
    //     })



  return (
    <Authenticated
        board={board}
        userBoards={userBoards}
        >
      <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle>Statuses</CardTitle>
        <CardDescription>Use Statuses to track Ideas on your Roadmap.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={submit}>
        <div className="flex gap-2">
          <Input
            id='name'
            name='name'
            value={data.name}
            placeholder="Status name"
            onChange={(e) => setData('name', e.target.value)}
          />

             <Button disabled={processing}>Add Status</Button>

        </div>
        </form>


        <div className="space-y-2">
          {statuses.map((status) => (
            <Status key={status.id} board={board} status={status} />
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Which Statuses are your "Completed" Status?
          </p>
          <div className="space-y-2">
            {statuses.map((status) => (
              <div key={status.id} className="flex items-center space-x-2">
                <Checkbox id={`status-${status.id}`} />
                <label
                  htmlFor={`status-${status.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {status.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    </Authenticated>
  )
}


export default Statuses;
