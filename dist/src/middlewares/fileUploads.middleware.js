"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fileUpload = (req, res, next) => {
    if (req.files) {
        const image = req.files?.image;
        if (!image)
            return res.status(400).json({ message: "Image not found" });
        const extname = path_1.default.extname(image.name);
        const imageName = `${(0, uuid_1.v4)()}${extname}`;
        image.mv(path_1.default.join(process.cwd(), "uploads", imageName), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to upload image" });
            }
            req.imageName = imageName;
            next();
        });
    }
    else {
        const image = req.body?.image;
        console.log(req.body?.image);
        if (!image)
            return res.status(400).json({ message: "Image not found" });
        req.imageName = image;
        next();
    }
};
exports.fileUpload = fileUpload;
