import { NextFunction, Request, RequestHandler, Response } from "express";
import { v4 as uuid } from "uuid";
import path from "path";
import { UploadedFile } from "express-fileupload";

interface UploadRequest extends Request {
  files: {
    image?: UploadedFile;
  };
  imageName?: string;
}

export const fileUpload = (
  req: UploadRequest,
  res: Response,
  next: NextFunction
):any => {
  if (req.files) {
    const image = req.files?.image;
    if (!image) return res.status(400).json({ message: "Image not found" });

    const extname = path.extname(image.name);
    const imageName = `${uuid()}${extname}`;

    image.mv(path.join(process.cwd(), "uploads", imageName), (err:any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to upload image" });
      }

      req.imageName = imageName;
      next();
    });
  } else {
    const image = req.body?.image;
    console.log(req.body?.image);
    if (!image) return res.status(400).json({ message: "Image not found" });

    req.imageName = image;
    next();
  }
};
