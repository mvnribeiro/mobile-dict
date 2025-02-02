import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot
} from "firebase/firestore"
import app from "./firebaseConfig"

const firestore = getFirestore(app)

export {
  firestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot
}

