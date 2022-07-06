import firebase from "firebase";
import { getStorage } from "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAlTgNgsG_2F2CexbLcQEOsioWfDLPo4_c",
  authDomain: "instagram-clone-89d8c.firebaseapp.com",
  projectId: "instagram-clone-89d8c",
  storageBucket: "instagram-clone-89d8c.appspot.com",
  messagingSenderId: "740965332275",
  appId: "1:740965332275:web:02b98f749ace89e001ba46"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();



export { db, auth, storage };
