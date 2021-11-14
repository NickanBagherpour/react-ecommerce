import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVgoMr1yzO7CZ0KjLyBSNgSYAk438nnbo",
  authDomain: "fir-tutorial-8b4d1.firebaseapp.com",
  databaseURL: "https://fir-tutorial-8b4d1.firebaseio.com",
  projectId: "fir-tutorial-8b4d1",
  storageBucket: "fir-tutorial-8b4d1.appspot.com",
  messagingSenderId: "274648413233",
  appId: "1:274648413233:web:c2e686ed54a867dbf6d110",
};

// firebase.initializeApp(config);

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// const app = firebase.initializeApp(firebaseConfig);
// const auth = app.auth();
// const firestore = app.firestore();

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log(`token: ${token} - credential: ${credential}`);

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(`errorCode: ${errorCode} - errorMessage: ${errorMessage} - credential: ${credential}`);

      // ...
    });

// export default firebase;
