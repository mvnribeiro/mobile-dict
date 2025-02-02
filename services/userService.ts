import {
  firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
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

export const addToHistory = async (userId: string, word: string) => {
  const userRef = doc(firestore, 'users', userId)
  await updateDoc(userRef, {
    history: arrayUnion(word)
  })
}

export const toggleFavorite = async (userId: string, word: string, isFavorite: boolean) => {
  const userRef = doc(firestore, 'users', userId)

  await updateDoc(userRef, {
    favorites: isFavorite ? arrayRemove(word) : arrayUnion(word)
  })
}
