
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC6NzvAZgoy_TSiaS_dU86YqQ4Y_u3dqRk",
    authDomain: "invoice-maker-a2905.firebaseapp.com",
    projectId: "invoice-maker-a2905",
    storageBucket: "invoice-maker-a2905.appspot.com",
    messagingSenderId: "735020125696",
    appId: "1:735020125696:web:1580ec4eef5877cdd5d2e5",
    measurementId: "G-M3EVKKSPRH"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}