'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const OtherProfile = ({ params }) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const username = searchParams.get('username')

    // Fetch states
    const [posts, setPosts] = useState([])
    const [offset, setOffset] = useState(0); // Number of posts already fetched
    const [hasMore, setHasMore] = useState(true); // Flag to check if there are more posts to fetch
    const [isLoading, setIsLoading] = useState(false)
    const bottomElementRef = useRef();



       // Function to fetch more posts when user reaches the bottom of the page
    const fetchMorePosts = async () => {
      if (!hasMore || isLoading) return; // If there are no more posts to fetch, return
      
      setIsLoading(true); // Start loading
      const response = await fetch(`/api/post?offset=${offset}&limit=5`);
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



  return (
    <Profile
        username={username}
        desc={`Przeglądaj rzeczowniki utworzone przez użytkownika ${username}.`}
        data={posts}
        isLoading={isLoading}
        bottomElementRef={bottomElementRef}
        hasMore={hasMore} />
  )
}

export default OtherProfile