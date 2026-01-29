import { useState, FormEventHandler } from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayoutSetting';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Card } from '@/Components/ui/card';
import { Switch } from '@/Components/ui/switch';
import { BoardType } from '@/types';
import { useForm } from '@inertiajs/react';
import { url } from 'inspector';
import { Button } from '@/Components/ui/button';

type Props = {
    board: BoardType;
    userBoards: BoardType[];
}


const General = ({board, userBoards}: Props) => {
    const [showLogo, setShowLogo] = useState(false);

    const { data, setData, put, processing } = useForm({
        name: '',
        image: '',
        url: '',
    });

    const submit : FormEventHandler = (e) => {
        e.preventDefault();

        put(route('general.update', {board: board}));
    }

    const [navigationSettings, setNavigationSettings] = useState({
        ideas: true,
        roadmap: true,
        announcements: true,
    });


  return (
    <Authenticated
         board={board}
         userBoards={userBoards}
    >
    <main className="flex-1 py-5 lg:px-[250px] sm:px-[150px]">
        <div className="max-w-2xl mx-auto p-2 space-y-5">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold">General Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your company settings.
                </p>
            </div>
            <hr />

            <div className="space-y-8">
                <div className="space-y-4">
                    <form onSubmit={submit}>
                    <h2 className="text-lg font-semibold">Company</h2>

                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 flex items-center justify-center bg-muted rounded-md text-2xl font-semibold">
                            K
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Switch to workspace layouts </p>
                            <p className="text-xs text-muted-foreground">
                                Recommended size: 256 x 256px
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor='show-logo'>Display</Label>
                        <div className="flex items-center gap-2">
                            <select
                                name=""
                                id="show-logo"
                                className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shodow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                            >
                              <option value="">Show logo & Company name</option>
                              <option value="">Show logo only</option>
                              <option value="">Show company name only</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor='logo-url'>Logo URL</Label>
                        <Input
                             id='logo-url'
                             value={data.url}
                             name={data.url}
                             placeholder='https://'
                             onChange={(e) => setData('url' , e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor='board-name'>Board Name</Label>
                         <Input
                            name={data.name}
                            value={data.name}
                            placeholder={`${board.name}`}
                            onChange={(e) => setData('name', e.target.value)}
                            />
                    </div>

                     <div  className="flex items-end justify-end py-2">
                    <Button disabled={processing}>Submit</Button>
                     </div>

                  </form>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Site Navigation</h2>

                    <div className="space-y-4 border p-2 rounded">
                        <div className="flex items-center justify-between">
                        <Label htmlFor="ideas">Ideas</Label>
                       <Switch
                        id="ideas"
                        checked={navigationSettings.ideas}
                        onCheckedChange={(checked) =>
                         setNavigationSettings((prev) => ({ ...prev, ideas: checked}))
                       }
                       />
                        </div>
                    </div>

                    <div className="space-y-4 border p-2 rounded">
                        <div className="flex items-center justify-between">
                        <Label htmlFor="roadmap">Roadmap</Label>
                       <Switch
                       id="roadmap"
                        checked={navigationSettings.roadmap}
                        onCheckedChange={(checked) =>
                         setNavigationSettings((prev) => ({ ...prev, roadmap: checked}))
                       }
                       />
                        </div>
                    </div>

                    <div className="space-y-4 border p-2 rounded">
                        <div className="flex items-center justify-between">
                        <Label htmlFor="ideas">Announcements</Label>
                       <Switch
                        id="announcements"
                        checked={navigationSettings.announcements}
                        onCheckedChange={(checked) =>
                         setNavigationSettings((prev) => ({ ...prev, announcements: checked}))
                       }
                       />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </Authenticated>
  )
}

export default General
