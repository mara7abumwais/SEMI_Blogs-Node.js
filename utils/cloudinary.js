import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
    cloud_name: 'dftsozmvw', 
    api_key: '262582743495357', 
    api_secret: process.env.CLOUDINARY_API_KEY
});

export default cloudinary;
