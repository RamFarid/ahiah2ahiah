import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useQuiz } from '../../Contexts/QuizContext'
import { useState } from 'react'
import Statistics from './Statistics'

function QuizTable() {
  const { quizzes: quizzesG, quizzesOntoTable, getQuizPerson } = useQuiz()
  const [currentStatistics, setCurrentStatistics] = useState(null)
  const closeStatistics = () => setCurrentStatistics(null)
  const canOpen = Boolean(
    currentStatistics && Object.keys(currentStatistics || {})?.length
  )
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 1000 }} size='medium' aria-label='table quizzes'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>الأسم</TableCell>
              {quizzesG?.map((quiz) => (
                <TableCell key={quiz._id} align='center'>
                  {quiz.title}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  borderRight: (t) => '1px solid ' + t.palette.divider,
                }}
                align='center'
              >
                مجموع الكويزات
              </TableCell>
              <TableCell
                sx={{
                  borderRight: (t) => '1px solid ' + t.palette.divider,
                }}
                align='center'
              >
                كويزات + بونص
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzesOntoTable.map((personRow) => (
              <TableRow
                key={personRow._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='right'>{personRow.name}</TableCell>
                {quizzesG.map((_quiz, i) => {
                  return (
                    <TableCell
                      key={personRow._id + i + 1}
                      component='th'
                      scope='row'
                      align={'center'}
                      onClick={() => {
                        if (personRow[i] === '-' || personRow[i] === 0) return
                        setCurrentStatistics(
                          getQuizPerson(personRow._id, _quiz._id)
                        )
                      }}
                    >
                      {personRow[i]}
                    </TableCell>
                  )
                })}
                <TableCell
                  component='th'
                  scope='row'
                  align={'center'}
                  sx={{
                    borderRight: (t) =>
                      '1px solid ' + t.palette.divider + ' !important',
                  }}
                >
                  {personRow.sumDegrees}
                </TableCell>
                <TableCell
                  component='th'
                  scope='row'
                  align={'center'}
                  sx={{
                    borderRight: (t) =>
                      '1px solid ' + t.palette.divider + ' !important',
                  }}
                >
                  {personRow.sumPoints}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Statistics
        canOpen={canOpen}
        closeStatistics={closeStatistics}
        currentStatistics={currentStatistics}
      />
    </>
  )
}

export default QuizTable
