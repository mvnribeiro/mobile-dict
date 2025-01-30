import { TouchableOpacity, Text, StyleSheet } from 'react-native'

type ButtonProps = {
  text: string,
  onPress: () => void,
  width: number,
  margin: number
}

const Button = ({ text, onPress, width, margin }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width, marginHorizontal: margin, marginVertical: margin }
      ]}
      onPress={ onPress }
    >
      <Text>{ text }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  }
})

export default Button
