import { View, Text } from 'react-native'
import WordsListDisplay from './components/WordsListDisplay'
import { useUserData } from '../context/UserDataContext'

export default function History() {
  const { history } = useUserData()
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
        History
      </Text>
      <WordsListDisplay userDataWords={ history } disablePagination />
    </View>
  )
}
