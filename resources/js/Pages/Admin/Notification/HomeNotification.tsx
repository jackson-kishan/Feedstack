import { Separator } from '@/Components/ui/separator'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { BoardType } from '@/types'
import React from 'react'

type Props = {
    board: BoardType;
    userBoards: BoardType[];
}

const HomeNotification = ({board, userBoards}: Props) => {

    console.log(userBoards)
  return (
       <Authenticated board={board} userBoards={userBoards}>


                <main className="flex-1 py-5 lg:px-[50px] sm:px-[150px]">
                    <div className="max-w-2xl mx-auto p-2 space-y-5">
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold">Notification</h1>
                            <Separator />


                        </div>
                    </div>
                </main>
            </Authenticated>
  )
}

export default HomeNotification;
