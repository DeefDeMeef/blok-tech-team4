const multer = require(`multer`);
const path = require(`path`);
// set storage engine multer

const storage = multer.diskStorage({
  destination: `./static/uploads`,
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

module.exports = multer({ storage });
