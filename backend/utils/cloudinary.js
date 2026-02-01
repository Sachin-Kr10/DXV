const cloudinary = require("cloudinary").v2;

/* ================= CONFIG ================= */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/* ================= UPLOAD FUNCTION ================= */
/*
  buffer  : file buffer from multer
  options : { folder, width, height }
*/
module.exports = (
  buffer,
  options = {}
) => {
  const {
    folder = "uploads",
    width = 800,
    height = 800
  } = options;

  return new Promise((resolve, reject) => {
    if (!buffer) {
      return reject(new Error("File buffer missing"));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          {
            width,
            height,
            crop: "limit",
            quality: "auto",
            fetch_format: "auto"
          }
        ]
      },
      (error, result) => {
        if (error) {
          return reject(
            new Error(
              error.message || "Cloudinary upload failed"
            )
          );
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height
        });
      }
    );

    stream.end(buffer);
  });
};
