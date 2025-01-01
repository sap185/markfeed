import mongoose from 'mongoose';

const SpaceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    headerName: {
        type: String,
        required: true,
    },
    customizedMessage: {
        type: String,
    },
    description: {
        type: String,
    },
    question1: {
        type: String,
    },
    question2: {
        type: String,
    },
    spaceImage: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Space = mongoose.model('Space', SpaceSchema);
export default Space;