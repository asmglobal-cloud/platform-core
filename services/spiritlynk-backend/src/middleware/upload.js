const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.endsWith(".csv")) {
      return cb(new Error("Only CSV files allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
