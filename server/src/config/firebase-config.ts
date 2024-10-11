import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
// import serviceAccount from './serviceAccount.json';

// export GOOGLE_APPLICATION_CREDENTIALS="/Users/kwamecarr/Downloads/kwamsc/server/src/config/serviceAccount.json"
// var serviceAccount = require("./serviceAccount.json");

export const app = admin.initializeApp({
  credential: applicationDefault(),
  // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://kwame-website.firebaseio.com",
});
