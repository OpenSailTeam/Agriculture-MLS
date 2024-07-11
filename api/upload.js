import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './awsConfig.js';

console.log('Initializing multer with S3 storage');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            console.log('Setting metadata for file:', file.originalname);
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileName = Date.now().toString() + '-' + file.originalname;
            console.log('Setting key for file:', fileName);
            cb(null, fileName);
        }
    })
});

export default upload;
