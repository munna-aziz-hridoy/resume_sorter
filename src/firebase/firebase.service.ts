import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccount: ServiceAccount = {
      projectId: 'resume-sorter-7c69e',
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'resume-sorter-7c69e.appspot.com',
      });
    }
  }

  // Upload a file to Firebase Storage
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = admin.storage().bucket();
    const filePath = `uploads/${file.originalname}`;

    await bucket.file(filePath).save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Get the file's public URL
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    return fileUrl;
  }
}
