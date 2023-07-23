import { connectToDB } from "@utils/database"
import Post from "@models/post";

// GET (read)

export const GET = async ({ params }) => {
    try {
        await connectToDB();

        const post = await Post.findById(params.id).populate('creator')

        if(!post) return new Response('Post not found', { status: 404})

        return new Response(JSON.stringify(post), {status: 200})

    }   catch (error) {
        return new Response('Failed to fetch post', { status: 500 })
     
    }
}

// PATCH  (update)
export const PATCH = async (request, { params }) => {
    const { noun,  animals } = await request.json();

    try {
        await connectToDB();

        const existingPost = await Post.findById(params.id);

        if(!existingPost) return new Response('Post not found', { status: 404 })

        existingPost.noun = noun
        existingPost.animals = animals

        await existingPost.save()
        return new Response(JSON.stringify(existingPost), { status: 200 } )

    } catch (error) {
        return new Response('Failed to update post', { status: 500 })
        
    }
}


// DELETE (delete)

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Post.findByIdAndRemove(params.id)

        return new Response('Post deleted successfully', { status: 200 })
        
    } catch (error) {
        return new Response('Failed to delete post', { status: 500 })
        
    }

}