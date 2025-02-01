import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native'
import { Link } from 'expo-router'
import { useWords } from '../../context/WordsContext'
import Button from './Button'

const NUM_COLUMNS = 3
const ITEM_MARGIN = 4
const SCREEN_WIDTH = Dimensions.get('window').width

const ITEM_WIDTH =
  (SCREEN_WIDTH - (ITEM_MARGIN * 2 * (NUM_COLUMNS + 1))) / NUM_COLUMNS

interface WordsListDisplayProps {
  userDataWords?: string[]
  disablePagination?: boolean
}

const WordsListDisplay = ({ 
  userDataWords,
  disablePagination = false 
}: WordsListDisplayProps) => {
  const context = useWords()
  
  const words = userDataWords || context.words
  const loading = userDataWords ? false : context.loading
  const hasMore = userDataWords ? false : context.hasMore

  const handleLoadMore = () => {
    if (!disablePagination && !loading && hasMore) {
      context.fetchWords(true)
    }
  }

  console.log(words)

  return (
    <View style={styles.container}>
      {loading && words.length === 0 ? (
        <ActivityIndicator size='large' />
      ) : (
        <FlatList
          contentContainerStyle={styles.gridContainer}
          data={words}
          numColumns={ NUM_COLUMNS }
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
          onEndReached={ disablePagination ? undefined : handleLoadMore }
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <Text style={ styles.emptyText }>
              No items found
            </Text>
          }
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  }
})

export default WordsListDisplay
