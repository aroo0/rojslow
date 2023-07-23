import { connectToDB } from "@utils/database"
import Post from "@models/post";

export const POST = async(req) => {
    const { userId, noun, animals } = await req.json()

    try {
        await connectToDB();

        const newPost = new Post({ 
            creator: userId,
            noun, 
            animals 
        })
        console.log(newPost)

        await newPost.save()

        return new Response(JSON.stringify(), {status: 201})
    } catch (error) {
        return new Response('Failed to create a new post', {status: 500})
        
    }
}