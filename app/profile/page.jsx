'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter()

    // Username states
    const [username, setUsername] = useState('');
    const [editUsernameSwitch, setEditUsernameSwitch] = useState(true);
    const [submitting,  setSubmitting] = useState(false);
    const [oldUsername, setOldUsername] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    // Fetch states
    const [posts, setPosts] = useState([])
    const [offset, setOffset] = useState(0); // Number of posts already fetched
    const [hasMore, setHasMore] = useState(true); // Flag to check if there are more posts to fetch
    const [isLoading, setIsLoading] = useState(false)
    const bottomElementRef = useRef();


    useEffect(() => {
      const fetchUsername = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/username`)
        const data = await response.json()
        setUsername(data)
        setOldUsername(data)
  
      }
      if (session?.user.id) fetchUsername()
    }, [])
  

    // Function to fetch more posts when user reaches the bottom of the page
    const fetchMorePosts = async () => {
      if (!hasMore || isLoading) return; // If there are no more posts to fetch, return
      
      setIsLoading(true); // Start loading
      const response = await fetch(`/api/users/${session?.user.id}/posts?offset=${offset}&limit=15`);
      const data = await response.json();

      if (data.length === 0) {
        // If no new posts are fetched, set hasMore to false to stop infinite scroll
        setHasMore(false);
      } else {
        // Append new posts to the existing list
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setOffset((prevOffset) => prevOffset + data.length); // Increment the offset
      }
      setIsLoading(false); // Stop loading
    };


    // Effect to fetch more posts when the user reaches the bottom of the page
    useEffect(() => {
      if (!bottomElementRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchMorePosts();
          }
        },
        { threshold: .5 }
      );

      observer.observe(bottomElementRef.current);

      return () => {
        if (bottomElementRef.current) {
          observer.unobserve(bottomElementRef.current);
        }
      };
    }, [bottomElementRef, offset]);


    
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
        submitting={submitting}
        isLoading={isLoading}
        hasMore={hasMore}
        bottomElementRef={bottomElementRef} />
  )
}

export default MyProfile