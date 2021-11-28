import {initializeApp} from "firebase/app";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    getDocs,
    onSnapshot,
    collection,
    writeBatch,
} from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

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
export const firestore = getFirestore(firebaseApp);
export const onSnap = onSnapshot;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

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
        const {displayName, email} = userAuth;
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

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        return user;
    } catch (error) {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
    }

    /*   createUserWithEmailAndPassword.then((userCredential) => {
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

export const customSignInWithEmailAndPassword = async (email, password) => {
    // if (!userAuth) return;

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        return user;
    } catch (error) {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
    }

    /*   signInWithEmailAndPassword.then((userCredential) => {
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const batch = writeBatch(firestore);
    const collectionRef = collection(firestore, collectionKey);
    objectsToAdd.forEach(obj => {
        const newDocRef = doc(collectionRef);
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const getCollection = (collectionKey) => {
    const collectionRef = collection(firestore, collectionKey);
    return collectionRef;
};

export const getDocsFromCollection = (collectionRef) => {
    return getDocs(collectionRef);
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};


// export default firebase;
