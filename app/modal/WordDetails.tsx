import { View, Text, ActivityIndicator, ScrollView, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { useWordDetails } from '../../hooks/useWordDetails'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext' 
import { addToHistory, toggleFavorite } from '../../services/userService'
import { MaterialIcons } from '@expo/vector-icons'

export default function WordDetailsModal() {
  const { word } = useLocalSearchParams()
  const { details, loading, error } = useWordDetails(word as string)
  const { favorites, history } = useUser()
  const [isFavorite, setIsFavorite] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user && word) {
      setIsFavorite(favorites.includes(word.toString()))
      addToHistory(user.uid, word as string)
    }
  }, [word, favorites, history])

  const handleFavorite = async () => {
    if (user) {
      setIsFavorite(!isFavorite)
      await toggleFavorite(user.uid, word as string, isFavorite)
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="close" size={ 28 } color="black" />
        </Pressable>
        <View 
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>{ error }</Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}
      >
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="close" size={ 28 } color="black" />
        </Pressable>

        <Pressable onPress={ handleFavorite }>
          <MaterialIcons name={ isFavorite ? 'favorite' : 'favorite-outline' } size={ 28 } color={ isFavorite ? 'red' : 'black' } />
        </Pressable>
      </View>

      <View
        style={{ flex: 1, padding: 16, backgroundColor: '#a9dfbf', borderRadius: 12, alignItems: 'center' }}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          { details?.word }
        </Text>
        {details?.phonetics && details.phonetics.length > 0 && (
          <Text style={{ fontSize: 18, color: '#666' }}>
            { details.phonetics[0].text }
          </Text>
        )}
      </View>

      {details?.meanings?.map((meaning: any, index: number) => (
        <View key={ index } style={{ marginTop: 16 }}>
          <Text
            style={{ fontSize: 14, fontWeight: 'bold' }}
          >
            { meaning.partOfSpeech }
          </Text>
          {meaning.definitions?.map((definition: any, defIndex: number) => (
            <Text key={ defIndex } style={{ fontSize: 12 }}>
              { definition.definition }
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  )
}
