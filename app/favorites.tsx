import WordsListDisplay from './components/WordsListDisplay'

export default function History() {
  const history = ['word1', 'word2', 'word3']
  return <WordsListDisplay userDataWords={history} disablePagination />
}
