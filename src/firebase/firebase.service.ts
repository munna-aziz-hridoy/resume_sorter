import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccount: admin.ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });
        console.log('Firebase initialized successfully');
      } catch (error) {
        console.error('Firebase initialization error:', error);
      }
    }
  }

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
    } catch (error: any) {
      console.error('Error uploading file to Firebase Storage:', error);
      throw new Error(
        `Failed to upload file to Firebase Storage: ${error?.message}`,
      );
    }
  }
}
