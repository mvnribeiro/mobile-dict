import { View, Pressable, Text, StyleSheet, Alert } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      Alert.alert('Logout failed:', (error as Error).message)
    }
  }
  return (
    <SafeAreaView style={{  backgroundColor: '#fff', marginTop: 12}}>
      <Pressable onPress={ handleLogout }>
        <Text style={{ alignSelf: 'flex-end', marginRight: 12 }}>
          Logout
        </Text>
      </Pressable>
      <View style={styles.container}>
        <Link href='/' asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Words</Text>
        </Pressable>
      </Link>

        <Link href='/history' asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>History</Text>
        </Pressable>

        </Link>

      <Link href='/favorites' asChild>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Favorites</Text>
        </Pressable>
      </Link>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 8
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderTopWidth: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
    textAlign: 'center'
  },
})