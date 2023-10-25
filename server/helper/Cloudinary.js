import cloudinary from 'cloudinary';
import multer from 'multer';

const storage = multer.memoryStorage();
const singleUpload = multer({ storage: storage }).single('file');

cloudinary.config({
  cloud_name: 'dw04muhvn',
  api_key: '491187614532196',
  api_secret: 'LaeC7UEw4x8lfy8cCE3reD9RP3Y',
});

export { cloudinary, singleUpload as default };
