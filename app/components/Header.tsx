import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function PersistentHeader() {
  return (
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
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 24,
    paddingHorizontal: 8
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRightWidth: 2,
    borderColor: '#333',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
    textAlign: 'center'
  },
})