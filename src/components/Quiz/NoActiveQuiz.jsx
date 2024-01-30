import { Stack, Typography } from '@mui/material'
import QuizIcon from '@mui/icons-material/Quiz'
function NoActiveQuiz() {
  return (
    <Stack
      gap={1.4}
      minHeight={'77vh'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <QuizIcon sx={{ width: '130px', height: '130px' }} color='primary' />
      <Typography
        component={'h1'}
        variant='h4'
        align='center'
        color={'primary'}
      >
        لا يوجد مسابقات مفتوحة في الوقت الحالي
      </Typography>
    </Stack>
  )
}

export default NoActiveQuiz
