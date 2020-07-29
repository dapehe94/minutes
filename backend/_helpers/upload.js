const multer  = require('multer');

const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const UPLOAD_PATH = 'src/assets/images/uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });

module.exports = upload;