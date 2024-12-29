import mongoose, { Schema } from "mongoose";

const SpaceSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    headerName: {
        type: String,
        required: true
    },
    customizedMessage: {
        type: String
    },
    description: {
        type: String
    },
    question1: {
        type: String
    },
    question2: {
        type: String
    },
    spaceImage: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

const Space = mongoose.model("Space", SpaceSchema);
export default Space;