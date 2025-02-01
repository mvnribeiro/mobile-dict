import React from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'

type ButtonProps = {
  text: string,
  onPress?: () => void,
  width?: number,
  margin?: number,
}

const WordsButton = React.forwardRef<View, ButtonProps>(
  ({ text, onPress, width, margin }, ref) => {
    return (
      <Pressable
        ref={ref}
        style={[
          styles.button,
          { width, marginHorizontal: margin, marginVertical: margin }
        ]}
        onPress={onPress}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    )
  }
)

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
  text: {
    fontWeight: '500',
    textAlign: 'center',
  }
})

export default WordsButton
