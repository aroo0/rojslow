import { connectToDB } from "@utils/database"
import Post from "@models/post";


export const GET = async (request) => {


    try {
        await connectToDB();

        const url = new URL(request.url)
        const offset = url.searchParams.get('offset') 
        const limit = url.searchParams.get('limit') 


        const posts = await Post.find({})
            .populate({
                path: 'creator',
                select: '-email' // Exclude the 'email' field from the populated 'creator' object
            })
            .sort({ date: -1 }) // Sort
            .skip(offset) // Skip the specified number of posts
            .limit(limit); // Limit the number of posts to be fetched

            console.log(posts)

        return new Response(JSON.stringify(posts), {status: 200})
        
    }   catch (error) {
        return new Response('Failed to fetch all posts', { status: 500 })
     
    }
}