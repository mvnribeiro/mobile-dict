import { View, Text, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useWordDetails } from '../../hooks/useWordDetails'

export default function WordDetailsModal() {
  const { word } = useLocalSearchParams()
  const { details, loading, error } = useWordDetails(word)

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
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
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{ details?.word }</Text>
      <Text style={{ fontSize: 18 }}>{ details?.phonetics?.[0]?.text }</Text>
      <Text onPress={() => router.back()}>Close</Text>
    </View>
  )
}
