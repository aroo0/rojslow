import  { Schema, model, models } from "mongoose";

const LikeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserId is required']
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'PostId is required']
    },
    timestamp: {
        type: Date,
        required: [true, 'Date is required']
    }
})

const Like = models.Like || model('Like', LikeSchema)

export default Like