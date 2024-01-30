import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import PropTypes from 'prop-types'

function QuizTable({ quizzes: quizzesG, persons }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 760 }} size='medium' aria-label='table quizzes'>
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
            >
              المجموع
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((person) => {
            return (
              <TableRow
                key={person._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='right'>{person.name}</TableCell>

                {person?.quizzes || person?.quizzes?.length ? (
                  <>
                    {quizzesG.map((quizG, i) => {
                      const targetQuiz = person.quizzes.find(
                        (q) => q.quiz_id === quizG._id
                      )
                      return (
                        <TableCell
                          key={targetQuiz?._id || i + person._id}
                          component='th'
                          scope='row'
                          align='center'
                        >
                          {targetQuiz?.degree || 0}
                        </TableCell>
                      )
                    })}
                    <TableCell
                      key={person?._id}
                      component='th'
                      scope='row'
                      align='center'
                      sx={{
                        borderRight: (t) =>
                          '1px solid ' + t.palette.divider + ' !important',
                      }}
                    >
                      {person.quizzes.reduce((pre, acc) => {
                        return pre + acc.degree
                      }, 0)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    {quizzesG.map((_, i) => (
                      <TableCell
                        component='th'
                        scope='row'
                        key={i + 2}
                        align='center'
                      >
                        {0}
                      </TableCell>
                    ))}
                    <TableCell
                      component='th'
                      scope='row'
                      align='center'
                      sx={{
                        borderRight: (t) =>
                          '1px solid ' + t.palette.divider + ' !important',
                      }}
                    >
                      0
                    </TableCell>
                  </>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

QuizTable.propTypes = {
  quizzes: PropTypes.array,
  persons: PropTypes.array,
}

export default QuizTable
