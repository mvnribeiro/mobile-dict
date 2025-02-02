import WordsListDisplay from './components/WordsListDisplay'
import { useUserData } from '../context/UserDataContext'

export default function History() {
  const { favorites } = useUserData()
  return <WordsListDisplay userDataWords={ favorites } disablePagination />
}
