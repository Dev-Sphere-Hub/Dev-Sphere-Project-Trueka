import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

@Injectable()
export class LocalUploadMiddleware implements NestMiddleware {
  private upload = multer({
    storage: multer.diskStorage({
      destination: function (_req, _file, callback) {
        callback(null, path.join(__dirname, '../../public/uploads'));
      },
      filename: function (_req, file, callback) {
        const destFilename = uuid() + path.extname(file.originalname);
        callback(null, destFilename);
      },
    }),
    fileFilter: (_req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/svg+xml' ||
        file.mimetype == 'image/webp'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  }).fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]);

  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, function (err) {
      if (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else {
        next();
      }
    });
  }
}
