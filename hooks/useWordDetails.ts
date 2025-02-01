import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useWordDetails = (word: string | string[] | undefined) => {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!word) return
    const cacheKey = `${word}-details`

    const fetchWordDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const cacheData = await AsyncStorage.getItem(cacheKey)
        if (cacheData) {
          setDetails(JSON.parse(cacheData))
          setLoading(false)
          return
        }
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        )

        if (!response.ok) throw new Error('Word not found')

        const data = await response.json()
        const detailsData = data[0]

        await AsyncStorage.setItem(cacheKey, JSON.stringify(detailsData))
        setDetails(detailsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch details')
      } finally {
        setLoading(false)
      }
    }

    fetchWordDetails()
  }, [word])

  return { details, loading, error }
}
