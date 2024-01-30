import { Button, Pagination, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'

function ShowQuiz({ quiz, back }) {
  const [questionShown, setQuestionShown] = useState(1)
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={3}
      >
        <Typography
          component={'h2'}
          variant='h6'
          margin={0}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100%'}
        >
          {quiz.title}
        </Typography>
        <Button onClick={back} disableElevation variant='contained'>
          للخلف
        </Button>
      </Stack>

      <Typography component={'h4'} variant='h6'>
        {questionShown}- {quiz?.questions[questionShown - 1].question}
      </Typography>
      {quiz?.questions[questionShown - 1]?.choices?.map((ch) => (
        <Typography
          component={'div'}
          key={ch._id}
          display={'flex'}
          alignItems={'center'}
          color={(t) =>
            ch.correct ? t.palette.success.main : t.palette.text.primary
          }
        >
          - {ch.choice} {ch.correct && <CheckIcon />}
        </Typography>
      ))}
      <Stack spacing={1} mt={3} alignItems={'center'}>
        <Pagination
          page={questionShown}
          color='primary'
          count={quiz?.questions?.length}
          sx={{ direction: 'ltr' }}
          onChange={(_e, page) => setQuestionShown(page)}
        />
      </Stack>
    </>
  )
}

ShowQuiz.propTypes = {
  quiz: PropTypes.object,
  back: PropTypes.func,
}

export default ShowQuiz
