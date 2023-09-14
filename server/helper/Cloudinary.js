// controllers/uploadController.js
import cloudinary from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary (replace with your Cloudinary credentials)
cloudinary.config({
    cloud_name: 'dw04muhvn',
    api_key: '491187614532196',
    api_secret: 'LaeC7UEw4x8lfy8cCE3reD9RP3Y',
});

// Configure Multer for file uploads
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a function to handle file uploads
export const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Save the file to a temporary location on your server
    const tempFilePath = `./uploads/${Date.now()}-${req.file.originalname}`;
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Upload the file to Cloudinary using the local file path
    const result = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: 'auto',
      folder: 'BookADoc',
    });

    // Delete the temporary file from your server
    fs.unlinkSync(tempFilePath);

    // Return the uploaded file's URL
    return res.status(201).json({ fileUrl: result.secure_url });
  } catch (error) {
    console.error('Upload and save error:', error);
    return res.status(500).send('Upload failed.');
  }
};


export const handleMultipleFileUploads = async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
  
    try {
      const uploadedFiles = [];
  
      for (const file of req.files) {
        // Save each file to a temporary location on your server
        const tempFilePath = `./uploads/${Date.now()}-${file.originalname}`;
        fs.writeFileSync(tempFilePath, file.buffer);
  
        // Upload the file to Cloudinary using the local file path
        const result = await cloudinary.uploader.upload(tempFilePath, {
          resource_type: 'auto',
          folder: 'BookADoc',
        });
  
        // Delete the temporary file from your server
        fs.unlinkSync(tempFilePath);
  
        // Add the uploaded file's URL to the list
        uploadedFiles.push(result.secure_url);
      }
  
      // Respond with the list of uploaded file URLs
      return res.status(201).json({ fileUrls: uploadedFiles });
    } catch (error) {
      console.error('Upload and save error:', error);
      return res.status(500).send('Upload failed.');
    }
  };