import { View, Text, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useEffect, useState } from 'react'

export default function WordDetailsModal() {
  const { word } = useLocalSearchParams()
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWordDetails = async () => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        
        if (!response.ok) throw new Error('Word not found');
        
        const data = await response.json();
        setDetails(data[0])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch details')
      } finally {
        setLoading(false)
      }
    }

    fetchWordDetails();
  }, [word]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
        <Text onPress={() => router.back()}>Close</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{details?.word}</Text>
      <Text style={{ fontSize: 18 }}>{ details?.phonetics[0].text }</Text>
      <Text onPress={() => router.back()}>Close</Text>
    </View>
  )
}