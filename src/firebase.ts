import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBNefUcyB3cSsMMTtTRE5fz7WuDEPM8ISU',
  authDomain: 'curious-ellipse-114703.firebaseapp.com',
  databaseURL: 'https://curious-ellipse-114703.firebaseio.com',
  projectId: 'curious-ellipse-114703',
  storageBucket: 'curious-ellipse-114703.appspot.com',
  messagingSenderId: '514558335378'
};

export const firebaseApp = firebase.initializeApp(config);
