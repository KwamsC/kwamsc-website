import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

// export GOOGLE_APPLICATION_CREDENTIALS="/Users/kwamecarr/Downloads/kwamsc/server/src/config/serviceAccount.json"
// var serviceAccount = require("./serviceAccount.json");

export const app = admin.initializeApp({
  credential: applicationDefault(),
  // credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kwame-website.firebaseio.com"
});

