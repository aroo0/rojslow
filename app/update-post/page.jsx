'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";


const EditPost = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    noun: '',
    animals: ''
  })

  useEffect(() => {
    const getPostDetails = async () => {
        const response = await fetch(`/api/post/${postId}`)
        const data = await response.json()

        setPost({
            noun: data.noun,
            animals: data.animals,
        }) 
    }

    if(postId) getPostDetails()

  }, [postId])

  const updatePost = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if(!postId) return alert('Post ID not found')
    
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          noun: post.noun.toLowerCase(),
          animals: capitalizeFirstLetter(post.animals)
        })
      })

      if (response.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
    type='Edytuj'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePost}

    />
  )
}

export default EditPost