import { useState, useEffect } from 'react'
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native'
import { database, ref, get, query, limitToFirst } from '../../firebaseConfig'
import Button from './Button'

const NUM_COLUMNS = 3
const ITEM_MARGIN = 4
const SCREEN_WIDTH = Dimensions.get('window').width

const ITEM_WIDTH = 
  (SCREEN_WIDTH - (ITEM_MARGIN * 2 * (NUM_COLUMNS + 1))) / NUM_COLUMNS

type Word = string

const WordsListDisplay = () => {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWords()
  }, [])

  const fetchWords = async () => {
    setLoading(true)
    try {
      const wordsRef = query(ref(database), limitToFirst(20))
      const snapshot = await get(wordsRef)
      const data = snapshot.val()
      const words: Word[] = Object.keys(data)
      setWords(words)
    } catch (error) {
      console.error('Error fetching words:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectWord = (word: Word) => {
    (console.log('word clicked', word))
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' />
      ) : (
        <FlatList
          contentContainerStyle={styles.gridContainer}
          data={words}
          numColumns={NUM_COLUMNS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Button
              text={ item }
              onPress={ () => handleSelectWord(item) }
              width={ ITEM_WIDTH }
              margin={ ITEM_MARGIN }
            />
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    padding: ITEM_MARGIN,
  }
})

export default WordsListDisplay
