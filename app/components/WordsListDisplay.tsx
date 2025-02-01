import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Link } from 'expo-router'
import { useWords } from '../../context/WordsContext'
import Button from './Button'

const NUM_COLUMNS = 3
const ITEM_MARGIN = 4
const SCREEN_WIDTH = Dimensions.get('window').width

const ITEM_WIDTH =
  (SCREEN_WIDTH - (ITEM_MARGIN * 2 * (NUM_COLUMNS + 1))) / NUM_COLUMNS

const WordsListDisplay = () => {
  const {
    words,
    loading,
    hasMore,
    fetchWords
  } = useWords()

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchWords(true)
    }
  }

  return (
    <View style={styles.container}>
      {loading && words.length === 0 ? (
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
  }
})

export default WordsListDisplay
