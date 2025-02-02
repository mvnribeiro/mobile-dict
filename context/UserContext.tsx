import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { getUserData, initializeUser } from '../services/userService'

type UserContextType = {
  history: string[]
  favorites: string[]
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [history, setHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid)
        if(!data) {
          await initializeUser(user.uid)
          setHistory([])
          setFavorites([])
        }
        if (data) {
          setHistory(data.history || [])
          setFavorites(data.favorites || [])
        }
      }
    }
    
    loadUserData()
  }, [user, favorites, history])

  return (
    <UserContext.Provider value={{ history, favorites }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
