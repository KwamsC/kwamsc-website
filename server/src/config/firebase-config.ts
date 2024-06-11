import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

export const app = admin.initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://kwame-website.firebaseio.com'
});
