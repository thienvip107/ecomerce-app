import * as firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAabdPmUhJGncHDVuLBRs90vnXUddJ_f-Y",
    authDomain: "ecomerce-app-6c55a.firebaseapp.com",
    databaseURL: "https://ecomerce-app-6c55a.firebaseio.com",
    projectId: "ecomerce-app-6c55a",
    storageBucket: "ecomerce-app-6c55a.appspot.com",
    messagingSenderId: "894195094007",
    appId: "1:894195094007:web:8591c353047fda85c21ef2",
    measurementId: "G-3VMYB72QHW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export const auth = firebase.auth()

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
