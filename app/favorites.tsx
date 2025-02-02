import WordsListDisplay from './components/WordsListDisplay'
import { useUser } from '../context/UserContext'

export default function History() {
  const { favorites } = useUser()
  return <WordsListDisplay userDataWords={ favorites } disablePagination />
}
