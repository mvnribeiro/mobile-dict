import { render, fireEvent } from '@testing-library/react-native'
import WordsButton from '../../../app/components/WordsButton'

describe('WordsButton', () => {
  it('renders with correct text', () => {
    const { getByText } = render(<WordsButton text="Click Me" />)
    expect(getByText('Click Me')).toBeTruthy()
  })

  it('triggers onPress when pressed', () => {
    const mockOnPress = jest.fn()
    const { getByText } = render(<WordsButton text="Click Me" onPress={mockOnPress} />)
    
    fireEvent.press(getByText('Click Me'))
    expect(mockOnPress).toHaveBeenCalled()
  })

  it('applies correct styles based on width and margin props', () => {
    const { getByText } = render(<WordsButton text="Click Me" width={200} margin={10} />)

    const buttonText = getByText('Click Me')
    const button = buttonText?.parent?.parent

    expect(button?.props.style).toContainEqual(
      expect.objectContaining({
        width: 200,
        marginHorizontal: 10,
        marginVertical: 10,
      })
    )
  })
})
