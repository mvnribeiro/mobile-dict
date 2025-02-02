import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'
import {
  database,
  ref,
  get,
  query,
  orderByKey,
  startAt,
  endAt,
  limitToFirst
} from '../firebase/firebaseDatabase'
import { Alert } from 'react-native'

type WordsContextType = {
  words: string[],
  loading: boolean,
  hasMore: boolean,
  searchQuery: string,
  fetchWords: (loadMore?: boolean) => Promise<void>,
  setSearchQuery: (query: string) => void
}

const WordsContext = createContext<WordsContextType>({} as WordsContextType)

export const WordsProvider = ({ children }: { children: React.ReactNode }) => {
  const [words, setWords] = useState<string[]>([])
  const [lastKey, setLastKey] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchWords = useCallback(async (loadMore = false) => {
    setLoading(true)
    
    try {
      let wordsRef
      if (searchQuery) {
        wordsRef = query(
          ref(database),
          orderByKey(),
          startAt(searchQuery),
          endAt(searchQuery + '\uf8ff'),
          limitToFirst(50)
        )
      } else if (loadMore && lastKey) {
        wordsRef = query(
          ref(database),
          orderByKey(),
          startAt(lastKey),
          limitToFirst(51)
        )
      } else {
        wordsRef = query(ref(database), orderByKey(), limitToFirst(51))
      }
  
      const snapshot = await get(wordsRef)
      const data = snapshot.val()

      if (!data) {
        setWords([])
        setHasMore(false)
        return
      }

      const fetchedWords = Object.keys(data)
  
      if (fetchedWords.length > 0) {
        const newLastKey = fetchedWords[fetchedWords.length - 1]
        setLastKey(newLastKey)

        if (fetchedWords.length === 51) {
          setHasMore(true)
          fetchedWords.pop()
        } else {
          setHasMore(false)
        }
  
        if (loadMore) {
          setWords((prevWords) => [...prevWords, ...fetchedWords])
        } else {
          setWords(fetchedWords)
        }
      } else {
        setHasMore(false)
      }
    } catch (error) {
      Alert.alert('Error fetching words:', (error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, lastKey])

  useEffect(() => {
    fetchWords()
  }, [searchQuery])

  return (
    <WordsContext.Provider
      value={{
        words,
        loading,
        hasMore,
        searchQuery,
        fetchWords,
        setSearchQuery
      }}
    >
      {children}
    </WordsContext.Provider>
  )
}

export const useWords = () => useContext(WordsContext)
