import { useState, useEffect } from 'react'

export const useWordDetails = (word: string | string[] | undefined) => {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!word) return

    const fetchWordDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        )

        if (!response.ok) throw new Error('Word not found')

        const data = await response.json()
        setDetails(data[0])
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
