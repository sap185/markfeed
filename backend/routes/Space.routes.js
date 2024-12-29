import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import Space from '../models/Spaces.models.js';
import dotenv from "dotenv";

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
        // console.log(req.body);
        cloudinary.v2.uploader.upload_stream(
            { resource_type: 'image' },
            async (error, cloudResult) => {
                if (error) {
                    return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
                }

                const newSpace = {
                    userId: req.body.userId || req.query.userId,
                    headerName: req.body.headerName || req.query.headerName,
                    customizedMessage: req.body.customizedMessage || req.query.customizedMessage,
                    description: req.body.description || req.query.description,
                    question1: req.body.question1 || req.query.question1,
                    question2: req.body.question2 || req.query.question2,
                    spaceImage: cloudResult.secure_url, // URL from Cloudinary
                    createdAt: new Date(),
                };

                try {
                    // console.log("New space data before saving:", newSpace);
                    const savedSpace = await Space.create(newSpace);
                    res
                        .status(200)
                        .json(savedSpace);
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

export default router;
