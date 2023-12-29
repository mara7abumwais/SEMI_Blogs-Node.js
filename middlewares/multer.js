import multer from "multer";

const fileValidation = {
    image:['image/png','image/jpeg','image/jpg'],
};

export const Multer = ()=>{
    const storage = multer.diskStorage({});
    function fileFilter (req, file, cb) {
        if(!fileValidation.image.includes(file.mimetype)){
            cb('Invalid form.',false);
        }else{
            cb(null,true);
        }
    }
    const upload = multer({fileFilter,storage});
    return upload;
};