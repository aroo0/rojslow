'use client';

import { useState } from "react";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";

const CreatePost = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    noun: '',
    animals: ''
  })

  const createPost = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          noun: post.noun.toLowerCase(),
          userId: session?.user.id,
          animals: capitalizeFirstLetter(post.animals)
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
    type='Nowy'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPost}

    />
  )
}

export default CreatePost