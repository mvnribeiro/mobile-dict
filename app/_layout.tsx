import { Stack } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import Header from './components/Header'
import { WordsProvider } from './context/WordsContext'

export default function RootLayout() {
  return (
    <WordsProvider>
      <View style={styles.container}>
        <Header />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='history' />
          <Stack.Screen name='favorites' />
        </Stack>
      </View>
    </WordsProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
