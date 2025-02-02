import WordsListDisplay from './components/WordsListDisplay'
import { useUser } from '../context/UserContext'

export default function History() {
  const { history } = useUser()
  return <WordsListDisplay userDataWords={ history } disablePagination />
}
