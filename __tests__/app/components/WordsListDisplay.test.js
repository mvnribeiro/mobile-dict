import { render, fireEvent } from '@testing-library/react-native'
import WordsListDisplay from '../../../app/components/WordsListDisplay'
import { useWords } from '../../../context/WordsContext'

jest.mock('../../../context/WordsContext', () => ({
  useWords: jest.fn(),
}))

jest.mock('expo-router', () => ({ Link: ({ children }) => children }))

describe('WordsListDisplay', () => {
  it('renders loading indicator when loading is true and words are empty', () => {
    useWords.mockReturnValue({
      words: [],
      loading: true,
      hasMore: false,
      fetchWords: jest.fn(),
    })

    const { getByTestId } = render(<WordsListDisplay />)
    expect(getByTestId('loadingIndicator')).toBeTruthy()
  })

  it('renders list of words when loading is false and words are available', () => {
    useWords.mockReturnValue({
      words: ['apple', 'banana', 'cherry'],
      loading: false,
      hasMore: false,
      fetchWords: jest.fn(),
    })

    const { getByText } = render(<WordsListDisplay />)
    expect(getByText('apple')).toBeTruthy()
    expect(getByText('banana')).toBeTruthy()
    expect(getByText('cherry')).toBeTruthy()
  })

  it('renders "No items found" when words are empty and not loading', () => {
    useWords.mockReturnValue({
      words: [],
      loading: false,
      hasMore: false,
      fetchWords: jest.fn(),
    })

    const { getByText } = render(<WordsListDisplay />)
    expect(getByText('No items found')).toBeTruthy()
  })

  it('calls fetchWords when scrolling reaches the end and more words are available', () => {
    const mockFetchWords = jest.fn()
    useWords.mockReturnValue({
      words: ['apple', 'banana'],
      loading: false,
      hasMore: true,
      fetchWords: mockFetchWords,
    })
  
    const { getByTestId } = render(<WordsListDisplay />)

    fireEvent.scroll(getByTestId('words-list'), {
      nativeEvent: {
        contentOffset: { y: 1500 },
        contentSize: { height: 2000 },
        layoutMeasurement: { height: 1000 },
      },
    })

    expect(mockFetchWords).toHaveBeenCalled
  })
  

  it('does not call fetchWords when pagination is disabled', () => {
    const mockFetchWords = jest.fn()
    useWords.mockReturnValue({
      words: ['apple', 'banana'],
      loading: false,
      hasMore: true,
      fetchWords: mockFetchWords,
    })

    const { getByTestId } = render(<WordsListDisplay disablePagination={true} />)

    fireEvent.scroll(getByTestId('words-list'), {
      nativeEvent: {
        contentOffset: { y: 1000 },
        contentSize: { height: 2000 },
        layoutMeasurement: { height: 1000 },
      },
    })

    expect(mockFetchWords).not.toHaveBeenCalled()
  })
})
