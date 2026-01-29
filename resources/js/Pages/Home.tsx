import React from 'react'
import { Button } from '@/Components/ui/button'
import { Link, Head, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'

const Home = () => {

    const auth = usePage<PageProps>().props;

  return (
    <div className="flex flex-row space-x-2 ">
        <Head title="Home" />
        {auth.user ? (
        <Button>
            <Link href={route('frontend.idea')}>Idea Feeds</Link>
        </Button>
        ) :
        (
        <Button>
            <Link href={route('login')}>Login</Link>
        </Button>
        )
        }

      <Button>
           <Link href={route('register')}>SignUp</Link>
      </Button>


  </div>
  )
}

export default Home;

