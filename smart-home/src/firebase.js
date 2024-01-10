import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyABwdI0EWoxbtQK1vbTc09IItELSKmaHxs",
  authDomain: "rahul-nayana.firebaseapp.com",
  projectId: "rahul-nayana",
  storageBucket: "rahul-nayana.appspot.com",
  messagingSenderId: "803088402706",
  appId: "1:803088402706:web:d76030858b283f77988bcb"
};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

export default firebase;