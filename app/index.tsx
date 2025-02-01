import { View } from 'react-native'
import WordsListDisplay from './components/WordsListDisplay'
import SearchBar from './components/SearchBar'
import { useWords } from '@/context/WordsContext'
import { StyleSheet } from 'react-native'

export default function Home() {
  const { setSearchQuery, searchQuery } = useWords()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.searchBar}>
        <SearchBar onSearch={ setSearchQuery } currentQuery={searchQuery} />
      </View>
      <WordsListDisplay />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    alignSelf: 'center'
  },
})
