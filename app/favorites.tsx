import WordsListDisplay from './components/WordsListDisplay'
import { useUserData } from '../context/UserDataContext'
import { View, Text } from 'react-native'

export default function History() {
  const { favorites } = useUserData()
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 24,
          color: '#555',
          fontWeight: 'bold',
          marginLeft: 16
        }}
      >
        Favorites
      </Text>
      <WordsListDisplay userDataWords={ favorites } disablePagination />
    </View>
  )
}
