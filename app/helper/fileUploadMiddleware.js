import fs from 'fs';
import multer from 'multer';

class FileUploadMiddleware {
  constructor() {
  }

  async handleUploads(req, res, next) {

    const files = req.files;
    const errors = [];
    const uploadFolder = './public/uploads'; // Change this to your desired folder path
    const uploadedFiles = [];

    // Create the "uploads" folder if it doesn't exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    // Function to move a file and return a promise
    const moveFile = (file, newPath) => {
      return new Promise((resolve, reject) => {
        file.mv(newPath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              name: file.name,
              size: file.size,
              mimetype: file.mimetype,
              path: newPath,
              url: `/uploads/${file.name}`, // Construct the URL
            });
          }
        });
      });
    };

    // Use Promise.all to wait for all file movements
    try {

      if (files != null) {
        const movePromises = files.image.map((file) => {
          const allowedTypes = ['image/jpeg', 'image/png'];
          const maxSize = 5 * 1024 * 1024; // 5MB

          if (!allowedTypes.includes(file.mimetype)) {
            errors.push(`Invalid file type: ${file.name}`);
            return Promise.resolve();
          }

          if (file.size > maxSize) {
            errors.push(`File too large: ${file.name}`);
            return Promise.resolve();
          }

          const newPath = `${uploadFolder}/${file.name}`;
          return moveFile(file, newPath);
        });

        const results = await Promise.all(movePromises);

        // Filter out any undefined results (files that didn't meet criteria)
        const validResults = results.filter((result) => result);

        uploadedFiles.push(...validResults);
        req.uploadedFiles = uploadedFiles;
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error moving files to destination.' });
    }
  };



  //  upload single image
  async uploadImage(req, res, next) {
    const file = req.files ? req.files.image : null;
    const errors = [];
    const uploadFolder = './public/uploads'; // Change path

    // Create the "uploads" folder if it doesn't exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    // Function to move a file and return a promise
    const moveFile = (file, newPath) => {
      return new Promise((resolve, reject) => {
        file.mv(newPath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              name: file.name,
              size: file.size,
              mimetype: file.mimetype,
              path: newPath,
              url: `/uploads/${file.name}`, // Construct the URL
            });
          }
        });
      });
    };

    try {
      if (file != null) {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.mimetype)) {
          errors.push(`Invalid file type: ${file.name}`);
          return res.status(400).json({ error: `Invalid file type: ${file.name}` });
        }

        if (file.size > maxSize) {
          errors.push(`File too large: ${file.name}`);
          return res.status(400).json({ error: `File too large: ${file.name}` });
        }

        const newPath = `${uploadFolder}/${file.name}`;
        const result = await moveFile(file, newPath);
        req.uploadedFiles = result;
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error moving file to destination.' });
    }
  }
}
export default new FileUploadMiddleware();
