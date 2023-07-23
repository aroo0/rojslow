'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Avatar from "./Avatar"

const PostCard = ( { post, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState('')

  // Like functionalty states
  const [isLiked, setIsLiked] = useState('')
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isFetching, setIsFetching] = useState(false);


  // Copy text from post
  const handleCopy = () => {
    setCopied(post.noun)
    navigator.clipboard.writeText(post.noun);
    setTimeout(() => setCopied(''), 3000)
  }

  // Checking who is author of post, to proper redirect
  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push('/profile')

    router.push(`/profile/${post.creator._id}?username=${post.creator.username}`)

  }

  // Fetching information about whether a user has liked a post
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`/api/like?userId=${session?.user.id}&postId=${post._id}`);
        const isLiked = await response.json();

        // Update the isLiked state based on the response
        if (response.ok) setIsLiked(isLiked);

        } catch (error) {
          console.log("Error fetching like status:", error);
        }
    };
    if (session?.user.id) fetchLikeStatus();

  }, [])


  // sending information about the user's interactions with the like button
  const handleLikeClick = async (e) => {
    e.preventDefault();

    if (isFetching) {
      // If a fetch request is already in progress, do nothing
      return;
    }
    // Update the fetching state to indicate that a request is in progress
    setIsFetching(true);
  
    // Immediately update the state to provide a more consistent user experience
    setIsLiked((prev) => !prev);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1)); 
  
    try {
      const response = await fetch(`/api/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user.id,
          postId: post._id,
        }),
      });
  
    } catch (error) {
      // If an error occurs during the API call, revert the state back
      setIsLiked((prev) => !prev);
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1)); 
  
      // Handle the error as needed (e.g., show an error message)
      console.error('An error occurred:', error);
    } finally {
    // Regardless of success or error, update the fetching state to indicate that the request is completed
    setIsFetching(false);
      }
    };


  return (
    <div className='noun_card'>
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex  justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
          <Avatar id={post.creator._id} />
          <div className='flex flex-col'>
            <h3 className="font-andada font-bold">
              {post.creator.username}
            </h3>
            <p className="text-sm font-inter">
              {post.creator.rankTitle}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied === post.noun
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={13}
            height={13}
            alt='copy'
            className="opacity-80"
        
          />
        </div>
      </div>
      <p className="font-andada text-lg mt-4">
        <span 
          className="font-bold cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.animals)}>
          {post.animals}{' '} 
        </span>
        <span className="italic">
           (l.mn),{' '}  
        </span>
        <span className="tracking-wide">
          {post.noun}.
        </span>
      </p>

      <div className="flex flex-end items-center gap-2 mt-4">
      <Image 
            src={isLiked ? '/assets/icons/PhStarFill.svg' :'/assets/icons/PhStar.svg'}
            width={18}
            height={18}
            className=" opacity-80 cursor-pointer"
            alt='star like button'
            onClick={session?.user.id && handleLikeClick}
          />
          <div className="font-medium text-sm text-black/80 w-2 text-right">{likeCount}</div>

      </div>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 ">
          <p 
            className="font-inter text-sm cursor-pointer"
            onClick={handleEdit}
            >
              Edytuj
          </p>
          <p 
            className="font-inter text-sm cursor-pointer"
            onClick={handleDelete}
            >
              Usuń
          </p>
        </div>
      )}
    </div>
  )
}

export default PostCard