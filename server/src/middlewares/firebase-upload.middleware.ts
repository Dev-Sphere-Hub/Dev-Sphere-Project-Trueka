import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as fs from 'fs';

@Injectable()
export class FirebaseUploadMiddleware implements NestMiddleware {
  private profilePicsRef: any;
  private productPicsRef: any;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.ST_BUCKET,
      messagingSenderId: process.env.MSG_SENDER_ID,
      appId: process.env.APP_ID,
    };

    const appFire = initializeApp(firebaseConfig);
    const storageFire = getStorage(appFire);
    this.profilePicsRef = ref(storageFire, 'trueka/profilepics');
    this.productPicsRef = ref(storageFire, 'trueka/products');
  }

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const filenames = res.req.files as Array<Express.Multer.File>;
      const values = Object.values(filenames);

      if (values.length < 1) {
        throw new Error(
          'Only .png, .svg, .webp, .jpg and .jpeg format allowed or file missing',
        );
      }

      const data = Object.values(values);
      const result = Object.keys(data).map((key: any) => [
        Number(key),
        data[key],
      ]);
      const result2: Array<any> = Array(result);
      const elementArr = result2[0][0][1];

      const localPath: Array<any> = [];

      for (let index = 0; index < elementArr.length; index++) {
        localPath.push(elementArr[index].path);
      }

      const uploader = [];
      for (let index = 0; index < elementArr.length; index++) {
        const finalRef =
          elementArr[index].fieldname === 'profilePic'
            ? this.profilePicsRef
            : this.productPicsRef;
        const spaceRef2 = ref(finalRef, elementArr[index].filename);
        const metadata = {
          contentType: elementArr[index].mimetype,
        };
        uploader.push(
          uploadBytes(spaceRef2, fs.readFileSync(localPath[index]), metadata),
        );
      }
      const urls: Promise<string | void>[] = [];
      const picsArr: Array<any> = [];
      Promise.all(uploader)
        .then((snapshot) => {
          snapshot.map((snap) => {
            urls.push(
              getDownloadURL(snap.ref).then((downloadURL: string) => {
                picsArr.push(downloadURL);
              }),
            );
          });
        })
        .then(() => {
          Promise.all(urls).then((result) => {
            req.body.images = picsArr;
            localPath.forEach((item) => {
              fs.unlink(item, (err) => {
                console.log('Deleted: ', item);
              });
            });
            next();
          });
        });
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
