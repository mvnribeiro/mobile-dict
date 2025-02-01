import { View, TextInput, Button, StyleSheet } from 'react-native'

export default function LoginScreen() {

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
      />
      <Button
        title='Login'
        color='#000'
      />
      <Button
        title='Register'
        color='#333'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 4
  }
})
