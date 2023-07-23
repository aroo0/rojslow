'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const OtherProfile = ({ params }) => {


    const router = useRouter()
    const searchParams = useSearchParams()
    const username = searchParams.get('username')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params.id}/posts`)
          const data = await response.json()
          setPosts(data)
    
        }
        if (params.id) fetchPosts()
      }, [])
    

  return (
    <Profile
        username={username}
        desc={`Przeglądaj rzeczowniki utworzone przez użytkownika ${username}.`}
        data={posts} />
  )
}

export default OtherProfile