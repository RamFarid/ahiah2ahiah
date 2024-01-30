import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ShowQuiz from '../components/Dashboard/ShowQuiz'
import { toast } from 'react-toastify'
import QuizCards from '../components/Dashboard/QuizCards'
import PageLoader from '../components/Quiz/PageLoader'
import server from '../lib/axios'
import QuizTable from '../components/Dashboard/QuizTable'
import { Navigate } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

function Dashboard() {
  const [targetQuiz, setTargetQuiz] = useState(null)
  const [quizzes, setQuizzes] = useState([])
  const { isLoggedIn } = useUser()
  const [pageState, setPageState] = useState({
    isQuizLoading: true,
    isStatisticsLoading: true,
    isSavingLoading: false,
  })
  const [persons, setPersons] = useState([])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        setPageState((pre) => ({ ...pre, isQuizLoading: true }))
        const { data: quizData } = await server.get('/quiz')
        const { data: personData } = await server.get('/persons/admin')
        setPageState((pre) => ({ ...pre, isQuizLoading: false }))
        setQuizzes(quizData.data)
        setPersons(personData.data)
        console.log(personData.data)
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
      }
    })()
  }, [])

  if (!isLoggedIn) return <Navigate to='/login' replace />

  const showQuiz = async (id) => {
    try {
      setPageState((p) => ({ ...p, isQuizLoading: true }))
      setTargetQuiz(quizzes.find((q) => q._id === id))
      // const { data } = await server.get(`/quiz/${id}/target`)
      // setTargetQuiz(data.data)
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message)
    } finally {
      setPageState((p) => ({ ...p, isQuizLoading: false }))
    }
  }

  const updateActiveQuiz = async (targetID) => {
    try {
      setPageState((p) => ({ ...p, isSavingLoading: true }))
      const { data } = await server.put(`/quiz/${targetID}/active`, {
        currentValue: quizzes?.find((r) => r._id === targetID)?.active,
      })
      if (!data.success) return toast.error(data.message)
      const updatedQuizs = quizzes.reduce((pre, current) => {
        if (current._id === targetID) {
          return [
            ...pre,
            {
              ...current,
              active: !current.active,
            },
          ]
        }
        return [
          ...pre,
          {
            ...current,
            active: false,
          },
        ]
      }, [])
      setQuizzes(updatedQuizs)
    } catch (error) {
      toast.error(error.mesaa)
      console.log(error)
    } finally {
      setPageState((p) => ({ ...p, isSavingLoading: false }))
    }
  }

  const returnToCards = () => {
    setTargetQuiz(null)
  }

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
            <ShowQuiz
              quiz={targetQuiz}
              back={returnToCards}
              members={
                quizzes.find((t) => {
                  return targetQuiz._id === t._id
                })?.members || []
              }
            />
          ) : (
            <QuizCards
              showQuiz={showQuiz}
              quizzes={quizzes}
              updateActiveQuiz={updateActiveQuiz}
              isSavingLoading={pageState.isSavingLoading}
            />
          )}
          <QuizTable quizzes={quizzes} persons={persons} />
        </>
      )}
    </>
  )
}

export default Dashboard
