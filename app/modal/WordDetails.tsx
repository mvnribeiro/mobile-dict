import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useWordDetails } from '../../hooks/useWordDetails'

export default function WordDetailsModal() {
  const { word } = useLocalSearchParams()
  const { details, loading, error } = useWordDetails(word as string)

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
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{ details?.word }</Text>
      </View>

      {details?.phonetics && details.phonetics.length > 0 && (
        <Text style={{ fontSize: 18 }}>{ details.phonetics[0].text }</Text>
      )}

      {details?.meanings?.map((meaning: any, index: number) => (
        <View key={ index } >
          <Text style={{ fontSize: 14 }}>{ meaning.partOfSpeech }</Text>
          { meaning.definitions?.map((definition: any, defIndex: number) => (
            <Text key={ defIndex } style={{ fontSize: 12 }}>
              { definition.definition }
            </Text>
          ))}
        </View>
      ))}
      
      <Text onPress={() => router.back()}>Close</Text>
    </ScrollView>
  )
}
