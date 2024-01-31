import { Button, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

function QuizHeader({
  isUser,
  onClickSubmit,
  activeQuiz,
  showAnswers,
  solvedNoShown,
  degree,
}) {
  return (
    <Stack
      sx={{
        width: '100%',
        zIndex: 3,
        flexDirection: 'row',
        py: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
        direction: 'rtl',
      }}
    >
      {isUser ? (
        <Button variant='contained' disableElevation onClick={onClickSubmit}>
          {showAnswers ? 'انهاء' : 'تسليم'}
        </Button>
      ) : null}
      <Typography variant='h5' align='center' bgcolor={'transparent'}>
        {activeQuiz.title}
      </Typography>
      <Typography
        component={'time'}
        variant={showAnswers ? 'h5' : 'caption'}
        fontWeight={showAnswers ? 900 : 500}
        maxWidth={'25%'}
        align='center'
        color={(t) => (showAnswers ? t.palette.success.main : 'inherit')}
      >
        {!isUser
          ? `${activeQuiz?.questions?.length} أسألة`
          : showAnswers
          ? `النتيجه: ${degree}/${activeQuiz?.questions?.length}`
          : `${solvedNoShown}/${activeQuiz?.questions?.length}`}
      </Typography>
    </Stack>
  )
}

QuizHeader.propTypes = {
  isUser: PropTypes.bool,
  onClickSubmit: PropTypes.func,
  activeQuiz: PropTypes.object,
  showAnswers: PropTypes.bool,
  solvedNoShown: PropTypes.number,
  degree: PropTypes.number,
}

export default QuizHeader
