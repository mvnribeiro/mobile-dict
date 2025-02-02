import {
  firestore,
  doc,
  getDoc,
  setDoc
} from '../firebase/firebaseFirestore'

export const getUserData = async (userId: string) => {
  const docRef = doc(firestore, 'users', userId)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : null
}

export const initializeUser = async (userId: string) => {
  await setDoc(doc(firestore, 'users', userId), {
    history: [],
    favorites: []
  })
}
