import { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, register } = useAuth()

  const handleLogin = async () => {
    try {
      await login(email, password)
    } catch (error) {
      console.log('Login Failed', error.message)
    }
  }

  const handleRegister = async () => {
    try {
      await register(email, password)
    } catch (error) {
      console.log('Registration Failed', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={ setEmail }
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={ setPassword }
        secureTextEntry
      />
      <Button
        title='Login'
        onPress={ handleLogin }
        color='#000'
      />
      <Button
        title='Register'
        onPress={ handleRegister }
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
