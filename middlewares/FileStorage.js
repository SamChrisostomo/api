const path = require("path");
const multer = require("multer");

exports.storage = multer.diskStorage({
    destination: (req, file, cb, next) => {
        const customPath = req.body.path;
        cb(next({message: "Não foi possível localizar a pasta de destino."}), customPath);
    },
    filename: (req, file, cb, next) => {
        const filename = Date.now() + path.extname(file.originalname);
        req.fileUploadedName = filename;
        cb(next({message: "Não foi possível renomear o arquivo."}), filename);
    }
});

exports.upload = multer({ storage: this.storage });