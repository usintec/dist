"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'
            || file.mimetype == 'image/png')
            cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        let newName = Date.now() + path_1.default.extname(file.originalname);
        cb(null, newName);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png') {
        cb(null, true);
    }
    else
        cb(null, false);
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
module.exports = upload;
