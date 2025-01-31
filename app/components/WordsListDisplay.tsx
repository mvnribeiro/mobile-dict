import { useState, useEffect } from 'react'
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { database, ref, get, query, limitToFirst, orderByKey, startAt, endAt } from '../../firebaseConfig'
import Button from './Button'
import { Link } from 'expo-router'
import SearchBar from './SearchBar'

const NUM_COLUMNS = 3
const ITEM_MARGIN = 4
const SCREEN_WIDTH = Dimensions.get('window').width

const ITEM_WIDTH =
  (SCREEN_WIDTH - (ITEM_MARGIN * 2 * (NUM_COLUMNS + 1))) / NUM_COLUMNS

type Word = string

const WordsListDisplay = () => {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchWords()
  }, [searchQuery])

  const fetchWords = async () => {
    setLoading(true)
    try {
      let wordsRef
      if (searchQuery) {
        wordsRef = query(
          ref(database),
          orderByKey(),
          startAt(searchQuery),
          endAt(searchQuery + '\uf8ff')
        )
      } else {
        wordsRef = query(ref(database), limitToFirst(50))
      }

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

  return (
    <View style={styles.container}>
      <SearchBar onSearch={ setSearchQuery } />
      {loading ? (
        <ActivityIndicator size='large' />
      ) : (
        <FlatList
          contentContainerStyle={styles.gridContainer}
          data={words}
          numColumns={NUM_COLUMNS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Link href={`/modal/WordDetails?word=${item}` as never} asChild>
              <Button
                text={ item }
                width={ ITEM_WIDTH }
                margin={ ITEM_MARGIN }
              />
            </Link>
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
  },
})

export default WordsListDisplay
