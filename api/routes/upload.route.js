import express from 'express';
import upload from '../upload.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/upload', verifyToken, (req, res, next) => {
    console.log('Received file upload request');
    next();
}, upload.single('image'), (req, res) => {
    if (req.file) {
        console.log('File uploaded successfully:', req.file.location);
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: req.file.location
        });
    } else {
        console.error('File upload failed');
        res.status(400).json({
            success: false,
            message: 'Image upload failed'
        });
    }
});

export default router;
