// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDs9r5T75-8kDcuTEB9x7URYLGli0oCabM',
  authDomain: 'chat-web-app-8f6da.firebaseapp.com',
  databaseURL:
    'https://chat-web-app-8f6da-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-web-app-8f6da',
  storageBucket: 'chat-web-app-8f6da.appspot.com',
  messagingSenderId: '862880108174',
  appId: '1:862880108174:web:f670ac03594531350c03df',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
