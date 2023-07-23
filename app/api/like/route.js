import Like from "@models/like";
import Post from "@models/post";
import User from "@models/user";
import { connectToDB } from "@utils/database";


// Handle GET if post is liked by logged user

export const GET = async (request, response) => {
    
    try {
        await connectToDB()

        const url = new URL(request.url)
        const userId = url.searchParams.get('userId')
        const postId = url.searchParams.get('postId')
  
        const likeExists = await Like.exists({
            userId: userId,
            postId: postId
        })

        const isLiked = likeExists !== null;

        return new Response(JSON.stringify(isLiked), {status: 200})

    } catch (error) {
        return new Response('An error occurred.', { status: 500 } )
        
    }
};


// Handle Like/Dislike Requests
export const PATCH = async (request) => {
    const { userId, postId } = await request.json()

    try {

        await connectToDB()

    // Check if the like exists
    const existingLike = await Like.findOne({ userId: userId, postId: postId });

    if (existingLike) {
    // If the like exists, remove it (dislike)
    await existingLike.deleteOne();
    // Decrement the like count of the post
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
    await User.findByIdAndUpdate(userId, { $inc: { likeCount: -1 } });

    return new Response('Like seccesfully deleted.', { status: 200 } )

    } else {
        
        // If the like does not exist, create it (like)
        const newLike = new Like({ 
            userId: userId, 
            postId: postId, 
            timestamp: Date.now() 
        })

        await newLike.save()
        
    // Increment the like count of the post
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
    await User.findByIdAndUpdate(userId, { $inc: { likeCount: 1 } });

    return new Response('Like seccesfully added.', { status: 201 } )

    }
    } catch (error) {
        console.log(error)
        return new Response('An error occurred.', { status: 500 });
    }
  }

