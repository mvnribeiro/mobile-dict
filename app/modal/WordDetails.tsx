import { View, Text, ActivityIndicator, ScrollView, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { useWordDetails } from '../../hooks/useWordDetails'
import { useAuth } from '../../context/AuthContext'
import { useUserData } from '../../context/UserDataContext' 
import { addToHistory, toggleFavorite } from '../../services/userService'
import { MaterialIcons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

export default function WordDetailsModal() {
  const { word } = useLocalSearchParams()
  const { wordDetails, loading, error } = useWordDetails(word as string)
  const { favorites, history } = useUserData()
  const [isFavorite, setIsFavorite] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user && word) {
      setIsFavorite(favorites.includes(word.toString()))
      addToHistory(user.uid, word as string)
    }
  }, [favorites, history])

  const handleFavorite = async () => {
    if (user) {
      setIsFavorite(!isFavorite)
      await toggleFavorite(user.uid, word as string, isFavorite)
    }
  }

  const playPronunciation = async () => {
    try {
      if (wordDetails?.pronunciation) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: wordDetails.pronunciation },
          { shouldPlay: true }
        )
        await sound.playAsync()
      }
    } catch (error) {
      console.log('Could not play pronunciation')
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
        style={{ flex: 1, padding: 16, backgroundColor: '#9999', borderRadius: 12, alignItems: 'center' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            { wordDetails?.word }
          </Text>
          {wordDetails?.pronunciation && (
            <Pressable onPress={ playPronunciation }>
              <MaterialIcons name="volume-up" size={ 24 } color="#666" />
            </Pressable>
          )}
        </View>
        {wordDetails?.phonetics && wordDetails.phonetics.length > 0 && (
          <Text style={{ fontSize: 18, color: '#666' }}>
            { wordDetails.phonetics[0].text }
          </Text>
        )}
      </View>

      {wordDetails?.meanings?.map((meaning: any, index: number) => (
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
