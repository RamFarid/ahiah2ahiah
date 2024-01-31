import { Typography } from '@mui/material'
import { useState } from 'react'
import ShowQuiz from '../components/Dashboard/ShowQuiz'
import QuizCards from '../components/Dashboard/QuizCards'
import PageLoader from '../components/Quiz/PageLoader'
import QuizTable from '../components/Dashboard/QuizTable'
import { Navigate } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'
import { useQuiz } from '../Contexts/QuizContext'

function Dashboard() {
  const [targetQuiz, setTargetQuiz] = useState(null)
  const { quizzes, pageState } = useQuiz()
  const { isLoggedIn } = useUser()
  if (!isLoggedIn) return <Navigate to='/login' replace />

  const showQuiz = (id) => setTargetQuiz(quizzes.find((q) => q._id === id))

  const returnToCards = () => setTargetQuiz(null)

  return (
    <>
      <Typography variant='h4' align='center' component={'h1'} mb={6}>
        وحدة التحكم و الاحصائيات
      </Typography>
      {pageState.isQuizLoading ? (
        <PageLoader />
      ) : (
        <>
          {targetQuiz ? (
            <ShowQuiz quiz={targetQuiz} onBack={returnToCards} />
          ) : (
            <QuizCards showQuiz={showQuiz} />
          )}
          <QuizTable />
        </>
      )}
    </>
  )
}

export default Dashboard
