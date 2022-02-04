import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8AmIs-Fw5lOTieqhRaEmwjEzw2ebEIxs",

  authDomain: "know-your-f1.firebaseapp.com",

  projectId: "know-your-f1",

  storageBucket: "know-your-f1.appspot.com",

  messagingSenderId: "604859963316",

  appId: "1:604859963316:web:21d696da570a7ddccbc4e1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();


export default db ;
