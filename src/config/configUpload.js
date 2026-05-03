const multer = require("multer");
const path = require("path");

const diretorio = 'public/uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        const nome = Date.now() + path.extname(file.originalname);
        cb(null, nome);
    }
});

module.exports = multer({ storage });