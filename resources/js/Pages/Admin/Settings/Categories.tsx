import { FormEventHandler } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayoutSetting';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
      Card,
      CardContent,
      CardTitle,
      CardDescription,
      CardHeader
    } from '@/Components/ui/card';
import { BoardType, CategoryType } from '@/types';

type Props = {
    board: BoardType;
    userBoards: BoardType[];
    categories: CategoryType[];
}

const Category = ({ board, userBoards, categories}: Props) => {


    const { data, setData, post, processing} = useForm({
        name: '',
        color: 'bg-blue-400',
    });

    const submit: FormEventHandler =  (e) => {
       e.preventDefault();

       post(route('categories.store', {board}));
    }

  return (
    <Authenticated
         board={board}
         userBoards={userBoards}
         >
      <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle>Category</CardTitle>
        <CardDescription>Create Category to organize your Announcement.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={submit} className="flex gap-2">
          <Input
            id='name'
            type='name'
            value={data.name}
            placeholder="Category Name"
            onChange={(e) => setData('name', e.target.value)}
          />

        <Button disabled={processing}>Add Category</Button>

        </form>

        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2 p-[5px] border rounded-md">
              <div className='p-[6px] ml-2 font-bold border rounded'>
                <div className={`p-[5px] border rounded-full ${category.color}`}>
                </div>
              </div>
              <span className='font-semiblod'>{category.name}</span>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>

    </Authenticated>
  )
}

export default Category;
