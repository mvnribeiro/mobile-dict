import { Stack } from 'expo-router'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import Header from './components/Header'
import { WordsProvider } from '../context/WordsContext'
import LoginScreen from './login'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { UserProvider } from '../context/UserContext'

function RootLayoutContent() {
  const { user, loading } = useAuth()
  if (!user) {
    return <LoginScreen />
  }

  if (loading) {
    return (
      <view style={ styles.loadingContainer }>
        <ActivityIndicator size='large' />
      </view>
    ) 
  }

  return (
    <WordsProvider>
      <UserProvider>
        <View style={styles.container}>
          <ExpoStatusBar style="dark" backgroundColor="#FFF" />
          <Header />
          <Stack screenOptions={{ header: () => null }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='history' />
            <Stack.Screen name='favorites' />
          </Stack>
        </View>
      </UserProvider>
    </WordsProvider>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
