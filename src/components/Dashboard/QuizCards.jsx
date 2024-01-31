import { Backdrop, Box, CircularProgress, Grid } from '@mui/material'
import QuizCardItem from './QuizCardItem'
import PropTypes from 'prop-types'
import { useQuiz } from '../../Contexts/QuizContext'
function QuizCards({ showQuiz }) {
  const {
    pageState: { isSavingLoading },
    updateActiveQuiz,
    quizzes,
  } = useQuiz()
  return (
    <Grid container spacing={3} position={'relative'}>
      {isSavingLoading && (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          zIndex={7}
          position={'absolute'}
          sx={{ inset: 0 }}
        >
          <Backdrop
            open={isSavingLoading}
            sx={{ inset: 0, position: 'absolute', zIndex: 4 }}
          />
          <CircularProgress />
        </Box>
      )}
      {quizzes?.map((q) => (
        <QuizCardItem
          key={q._id}
          {...q}
          updateActiveQuiz={updateActiveQuiz}
          showQuiz={showQuiz}
          isSavingLoading={isSavingLoading}
        />
      ))}
    </Grid>
  )
}

QuizCards.propTypes = {
  showQuiz: PropTypes.func,
}
export default QuizCards
