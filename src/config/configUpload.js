const multer = require("multer");
const path = require("path");

const diretorio = 'public/uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (file.mimetype.startsWith("audio")) {
            cb(null, "./public/musicas");
        } else {
        cb(null, "public/uploads");
        }
    },
    filename: (req, file, cb) => {
        const nome = Date.now() + "-" + file.originalname;
        cb(null, nome);
    }
});

const upload = multer({
    storage
});

module.exports = upload;