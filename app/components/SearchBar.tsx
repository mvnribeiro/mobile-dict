import React, { useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSearch = (text: string) => {
    setQuery(text)
    onSearch(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search for a word...'
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
})

export default SearchBar
