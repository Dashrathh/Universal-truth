import express from 'express';
import multer from 'multer';
import cloudinary from './cloudinaryConfig';  // Cloudinary configuration import
import { upload } from './path-to-your-multer-config';  // Your Multer configuration import

const app = express();
const port = 3000;

// Cloudinary upload function
const uploadToCloudinary = async (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { folder: 'uploads' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

// EJS setup
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// GET route for rendering the form
app.get('/upload', (req, res) => {
  res.render('upload', { images: null });  // Render the form with no images initially
});

// POST route for handling file uploads
app.post('/upload-images', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'favicon', maxCount: 1 },
  { name: 'researchImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const logo = req.files['logo'] ? await uploadToCloudinary(req.files['logo'][0].path) : null;
    const favicon = req.files['favicon'] ? await uploadToCloudinary(req.files['favicon'][0].path) : null;
    const researchImage = req.files['researchImage'] ? await uploadToCloudinary(req.files['researchImage'][0].path) : null;

    const images = {
      logoUrl: logo ? logo.secure_url : null,
      faviconUrl: favicon ? favicon.secure_url : null,
      researchImageUrl: researchImage ? researchImage.secure_url : null
    };

    res.render('upload', { images });  // Pass the uploaded image URLs to the EJS template
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
