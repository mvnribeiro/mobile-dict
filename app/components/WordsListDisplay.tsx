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
  const [lastKey, setLastKey] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchWords()
  }, [searchQuery])

  const fetchWords = async (loadMore = false) => {
    setLoading(true)
  
    try {
      let wordsRef
      if (searchQuery) {
        wordsRef = query(
          ref(database),
          orderByKey(),
          startAt(searchQuery),
          endAt(searchQuery + '\uf8ff'),
          limitToFirst(50)
        )
      } else if (loadMore && lastKey) {
        wordsRef = query(
          ref(database),
          orderByKey(),
          startAt(lastKey),
          limitToFirst(51)
        )
      } else {
        wordsRef = query(ref(database), orderByKey(), limitToFirst(51))
      }
  
      const snapshot = await get(wordsRef)
      const data = snapshot.val()
      const fetchedWords: Word[] = Object.keys(data)
  
      console.log('Fetched words:', fetchedWords)
      console.log('fetched length', fetchedWords.length)
  
      if (fetchedWords.length > 0) {
        const newLastKey = fetchedWords[fetchedWords.length - 1]
        console.log('New last key:', newLastKey)
        setLastKey(newLastKey)

        if (fetchedWords.length === 51) {
          setHasMore(true)
          fetchedWords.pop()
        } else {
          setHasMore(false)
        }
  
        if (loadMore) {
          setWords((prevWords) => [...prevWords, ...fetchedWords])
        } else {
          setWords(fetchedWords)
        }
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching words:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    console.log('Load more triggered')
    console.log('Has more', hasMore)
    if (!loading && hasMore) {
      fetchWords(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar onSearch={setSearchQuery} />
      </View>
      {loading && words.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          contentContainerStyle={styles.gridContainer}
          data={words}
          numColumns={NUM_COLUMNS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Link href={`/modal/WordDetails?word=${item}` as never} asChild>
              <Button text={item} width={ITEM_WIDTH} margin={ITEM_MARGIN} />
            </Link>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  gridContainer: {
    padding: ITEM_MARGIN,
  },
  searchBar: {
    width: '100%',
    alignSelf: 'center'
  },
})

export default WordsListDisplay
