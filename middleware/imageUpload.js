const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imagepath = "uploads/images";
    fs.mkdirSync(imagepath, { recursive: true });
    cb(null, imagepath);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|PNG)$/)) {
    return cb(new Error("You can upload only image files!!"));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
});

module.exports = upload;
