import { TextInput, View, StyleSheet } from 'react-native'

const SearchBar = ({ 
  onSearch,
  currentQuery 
}: { 
  onSearch: (query: string) => void;
  currentQuery: string;
}) => {
  return (
    <View style={ styles.container }>
      <TextInput
        style={styles.input}
        placeholder='Search for a word...'
        value={ currentQuery }
        onChangeText={ onSearch }
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
