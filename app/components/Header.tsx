// app/components/PersistentHeader.tsx
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function PersistentHeader() {
  return (
    <View style={styles.container}>
      <Link href='/' asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Words</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/history' asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>History</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/favorites' asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Favorites</Text>
        </TouchableOpacity>
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