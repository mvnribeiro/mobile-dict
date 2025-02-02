import WordsListDisplay from './components/WordsListDisplay'
import { useUserData } from '../context/UserDataContext'

export default function History() {
  const { history } = useUserData()
  return <WordsListDisplay userDataWords={ history } disablePagination />
}
