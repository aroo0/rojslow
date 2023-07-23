import  { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    noun: {
        type: String,
        required: [true, 'Post is required']
    },
    animals: {
        type: String,
        required: [true, 'Animals are required.']
    },
    likeCount: { 
        type: Number, 
        default: 0 
    },
})

const Post = models.Post || model('Post', PostSchema)

export default Post