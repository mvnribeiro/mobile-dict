import { useState, useEffect } from 'react'
import { 
  FlatList, 
  View, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions 
} from 'react-native'
import { database, ref, get, query, limitToFirst } from '../../firebaseConfig'

const NUM_COLUMNS = 3
const ITEM_MARGIN = 4
const SCREEN_WIDTH = Dimensions.get('window').width

const ITEM_WIDTH = 
  (SCREEN_WIDTH - (ITEM_MARGIN * 2 * (NUM_COLUMNS + 1))) / NUM_COLUMNS

const WordsListDisplay = () => {
  const [words, setWords] = useState([])
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
      const words = Object.keys(data)
      setWords(words)
    } catch (error) {
      console.error('Error fetching words:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectWord = (word) => {
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
            <TouchableOpacity 
              style={[styles.gridItem, { 
                width: ITEM_WIDTH,
                marginHorizontal: ITEM_MARGIN,
                marginVertical: ITEM_MARGIN
              }]}
              onPress={() => handleSelectWord(item)}
            >
              <Text style={styles.gridItemText}>{item}</Text>
            </TouchableOpacity>
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
  gridItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gridItemText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  }
})

export default WordsListDisplay
