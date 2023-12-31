import { connectToDB } from "@utils/database"
import Post from "@models/post";
import User from "@models/user";



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


        return new Response(JSON.stringify(posts), {status: 200})
        
    }   catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
     
    }
}