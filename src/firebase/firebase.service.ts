import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { Express } from 'express';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccount: ServiceAccount = {
      projectId: 'resume-sorter-7c69e',
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    // Initialize Firebase Admin SDK if it hasn't been initialized yet
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'resume-sorter-7c69e.appspot.com',
      });
    }
  }

  /**
   * Upload a file to Firebase Storage
   * @param file - The file to be uploaded
   * @returns The public URL of the uploaded file
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const bucket = admin.storage().bucket();
      const filePath = `uploads/${file.originalname}`;

      // Upload the file to the bucket
      await bucket.file(filePath).save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      // Make the file publicly accessible
      await bucket.file(filePath).makePublic();

      // Get the file's public URL
      const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
      return fileUrl;
    } catch (error) {
      console.error('Error uploading file to Firebase Storage:', error);
      throw new Error('Failed to upload file to Firebase Storage.');
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// import { ServiceAccount } from 'firebase-admin';

// @Injectable()
// export class FirebaseService {
//   constructor() {
//     const serviceAccount: ServiceAccount = {
//       projectId: 'resume-sorter-7c69e',
//       privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     };

//     if (!admin.apps.length) {
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         storageBucket: 'resume-sorter-7c69e.appspot.com',
//       });
//     }
//   }

//   // Upload a file to Firebase Storage
//   async uploadFile(file: Express.Multer.File): Promise<string> {
//     const bucket = admin.storage().bucket();
//     const filePath = `uploads/${file.originalname}`;

//     await bucket.file(filePath).save(file.buffer, {
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });

//     // Get the file's public URL
//     const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
//     return fileUrl;
//   }
// }
