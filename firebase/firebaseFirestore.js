import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore"
import app from "./firebaseConfig"

const firestore = getFirestore(app)

export {
  firestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc,
}

