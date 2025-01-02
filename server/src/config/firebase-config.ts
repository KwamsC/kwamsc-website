import { applicationDefault, initializeApp } from "firebase-admin/app";

export const app = initializeApp({
	credential: applicationDefault(),
	databaseURL: "https://kwame-website.firebaseio.com",
});
