import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import Space from '../models/Spaces.models.js';
import dotenv from "dotenv";
import { getIo } from '../socket.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/save-space", upload.single('spaceImage'), async (req, res) => {
    try {
        console.log(req.body);
        cloudinary.v2.uploader.upload_stream(
            { resource_type: 'image' },
            async (error, cloudResult) => {
                if (error) {
                    return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
                }

                const newSpace = {
                    userId: req.body.userId,
                    headerName: req.body.headerName,
                    customizedMessage: req.body.customizedMessage,
                    description: req.body.description,
                    question1: req.body.question1,
                    question2: req.body.question2,
                    spaceImage: cloudResult.secure_url,
                    createdAt: new Date(),
                };

                try {
                    // console.log("New space data before saving:", newSpace);
                    const savedSpace = await Space.create(newSpace);
                    res
                        .status(200)
                        .json({ message: 'Space saved successfully', space: savedSpace });

                        const io = getIo();
                        const spaceCount = await Space.countDocuments({ userId: req.body.userId });
                        console.log("spaceCount:", spaceCount);
                        io.emit("updateSpaceCount", { userId: req.body.userId, spaceCount });
                        console.log(io.emit("updateSpaceCount", { userId: req.body.userId, spaceCount }));

                } catch (dbError) {
                    res
                        .status(500)
                        .json({ error: 'Failed to save space to database' });
                }
            }
        ).end(req.file.buffer);

    } catch (error) {
        res
            .status(500)
            .json({ error: 'Server error' });
    }
});

router.get("/get-space-count", async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    try {
        const spaceCount = await Space.countDocuments({ userId });
        res.status(200).json({ spaceCount });
    } catch (error) {
        console.error("Error fetching space count:", error);
        res.status(500).json({ error: "Failed to fetch space count" });
    }
});


export default router;
