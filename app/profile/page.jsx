'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter()

    const [posts, setPosts] = useState([])

    // Username states
    const [username, setUsername] = useState('');
    const [editUsernameSwitch, setEditUsernameSwitch] = useState(true);
    const [submitting,  setSubmitting] = useState(false);
    const [oldUsername, setOldUsername] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json()
          setPosts(data)
    
        }
        if (session?.user.id) fetchPosts()
      }, [])

    useEffect(() => {
        const fetchUsername = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/username`)
          const data = await response.json()
          setUsername(data)
          setOldUsername(data)
    
        }
        if (session?.user.id) fetchUsername()
      }, [])
    
    
    const handleEdit = (post) => {
      router.push(`/update-post?id=${post._id}`)

    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm('Czy na pewno chcesz usunąć ten rzeczownik?')

      if(hasConfirmed) {
        try {
          await fetch(`/api/post/${post._id.toString()}`, {
            method: 'DELETE'
          })
          const filteredPosts = posts.filter((p) => p._id !== post._id)
          setPosts(filteredPosts)

        } catch (error) {
          console.log(error)
        }
      }
    }

    const handleUsernameEditSubmit =  async (e) => {
        e.preventDefault()
        setSubmitting(true)
            
        try {
          const response = await fetch(`/api/users/${session?.user.id}/username`, {
            method: 'PATCH',
            body: JSON.stringify({
              username: username
            }),
          })
          const statusCode = response.status; // Retrieve the status code from the response

          if (statusCode === 200) {
            setResponseMessage('Nazwa użytkownika zmieniona pomyślnie. ✅ ✅ ')
            setTimeout(() => {
              router.push('/');
              }, 2000);

          } else if (statusCode === 409) {
            setResponseMessage('Nazwa użytkownika jest zajęta. ❌ ❌')
            setUsername(oldUsername)
          } else {
            setResponseMessage('Coś poszło nie tak. ❌ ❌')
            setUsername(oldUsername)
          }

        } catch (error) {
          console.log('Error: ', error);
        } finally {
          setSubmitting(false)
          setEditUsernameSwitch(true)
        }
    }

  return (
    <Profile
        username={username}
        oldUsername={oldUsername}
        setUsername={setUsername}
        setEditUsernameSwitch={setEditUsernameSwitch}
        editUsernameSwitch={editUsernameSwitch}
        responseMessage={responseMessage}
        desc='Tutaj możesz zarządzać utworzonymi przez siebie rzeczownikami.'
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleUsernameEditSubmit={handleUsernameEditSubmit}
        submitting={submitting} />
  )
}

export default MyProfile