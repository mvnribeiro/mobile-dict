import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { getUserData, initializeUser } from '../services/userService'
import { firestore, doc, onSnapshot } from '../firebase/firebaseFirestore'

type UserContextType = {
  history: string[]
  favorites: string[]
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [history, setHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (user) {
      const userRef = doc(firestore, 'users', user.uid);

      (async () => {
        const data = await getUserData(user.uid);
        if (!data) {
          await initializeUser(user.uid);
        }
      })();

      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setHistory(data.history || []);
          setFavorites(data.favorites || []);
        }
      });

      return () => unsubscribe();
    }
  }, [user])

  return (
    <UserContext.Provider value={{ history, favorites }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserData = () => useContext(UserContext)
