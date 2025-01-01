import mongoose from "mongoose";

const FeedBackLinkSchema = new mongoose.Schema({
    spaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
        required: true
    },
    feedbackLink: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const FeedBackLink = mongoose.model('feedbacklink', FeedBackLinkSchema);
export default FeedBackLink;