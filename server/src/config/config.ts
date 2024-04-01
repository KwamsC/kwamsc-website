import { config } from 'dotenv';
import assert from 'assert';

config();

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  ADDRESS,
} = process.env;

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

export default {
  host: HOST,
  port: PORT,
  address: ADDRESS,
  url: HOST_URL,
  firebaseConfig,
};
