import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCePk_xapjNxZHoJzClK4ay4PzRTLXySns",
  authDomain: "react-ecommerce-c0a1f.firebaseapp.com",
  projectId: "react-ecommerce-c0a1f",
  storageBucket: "react-ecommerce-c0a1f.appspot.com",
  messagingSenderId: "31655364197",
  appId: "1:31655364197:web:0ddf9bd287a364ece3688c",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
export const onSnap = onSnapshot;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      //// This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      //// The signed-in user info.
      // const user = result.user;

      // console.log(`token: ${token} - credential: ${credential}`);
    })
    .catch((error) => {
      //// Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      //// The email of the user's account used.
      // const email = error.email;
      //// The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);

      //// console.log(`errorCode: ${errorCode} - errorMessage: ${errorMessage} - credential: ${credential}`);

    });

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  // console.log(`snapShot.exists ${snapShot.exists()}`);
  // console.log(`snapShot.data ${snapShot.data()}`);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const docData = {
      displayName,
      email,
      createdAt,
      ...additionalData,
    };

    try {
      await setDoc(userRef, docData);
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const customCreateUserWithEmailAndPassword = async (email, password) => {
  // if (!userAuth) return;

  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user;
  }
  catch(error){
    console.error(error);
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // ..
  };

/*   .then((userCredential) => {
    // Signed in 
    user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); */

  return null;
};


// export default firebase;
