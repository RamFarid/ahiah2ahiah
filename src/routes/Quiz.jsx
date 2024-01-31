import { Box, Typography } from '@mui/material'
// import MultiTask from '../components/Quiz/MultiTask'
import SingleTask from '../components/Quiz/SingleTask'
import { useEffect, useRef, useState } from 'react'
import axios from '../lib/axios'
import Examiner from '../components/Quiz/Examiner'
import { toast } from 'react-toastify'
import PageLoader from '../components/Quiz/PageLoader'
import NoActiveQuiz from '../components/Quiz/NoActiveQuiz'
import EnsureSubmitPortal from '../components/Quiz/EnsureSubmitPortal'
import server from '../lib/axios'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import CustomPagination from '../components/Quiz/CustomPagination'
import QuizHeader from '../components/Quiz/QuizHeader'

function Quiz() {
  const [questionShown, setQuestionShown] = useState(1)
  const [activeQuiz, setActiveQuiz] = useState({})
  const [showAnswers, setShowAnswers] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [degree, setDegree] = useState(0)
  const [isEnsure, setIsEnsure] = useState(false)
  const [pageState, setPageState] = useState({
    message: '',
    isLoading: true,
    code: '',
  })
  const swiperRef = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (showAnswers) return
      try {
        setPageState({
          code: '',
          message: '',
          isLoading: true,
        })
        const { data } = await server.get('/quiz/active')
        if (data?.success) setActiveQuiz(data?.data)
        if (data?.code === 'NO_ACTIVE_QUIZ') {
          setPageState({
            code: 'NO_ACTIVE_QUIZ',
            message: 'مفيش كويزات في الوقت الحالي',
            isLoading: false,
          })
        } else {
          setPageState((p) => ({
            ...p,
            message: !data.success ? data.message : '',
            isLoading: false,
          }))
        }
      } catch (error) {
        toast.error(error.message)
        setPageState({
          message: error.message,
          isLoading: false,
        })
        console.log(error)
      } finally {
        setPageState((c) => ({
          ...c,
          isLoading: false,
        }))
      }
    })()
  }, [showAnswers])

  const onPaginationChange = (_e, page) => {
    setQuestionShown(page)
    swiperRef?.current?.swiper.slideTo(page - 1)
  }

  const solveQuestion = (targetID, answer) => {
    if (!targetID) return

    const targetQuestion = activeQuiz?.questions?.find(
      ({ _id }) => _id === targetID
    )
    targetQuestion.answer = answer
    setActiveQuiz((p) => {
      return {
        ...p,
        questions: p.questions.map((q) => {
          if (q._id === targetQuestion._id) return targetQuestion
          return q
        }),
      }
    })
  }

  const calculateDegrees = () => {
    let userDegree = 0
    // for (let index = 0; index < activeQuiz?.questions?.length; index++) {
    for (let question of activeQuiz.questions) {
      const choosenChoice = question?.choices.find(
        (q) => q._id === question?.answer
      )
      if (choosenChoice && choosenChoice?.correct) {
        userDegree += 1
      }
    }
    return userDegree
  }

  const getAnswers = () => {
    return activeQuiz?.questions?.map((question) => ({
      question_id: question?._id,
      answer: question?.answer || '',
    }))
  }

  const submitQuiz = async () => {
    if (showAnswers) return resetQuiz()
    if (!currentUser?._id) return toast.error('اختار اسمك عشان تعرف تحل')
    try {
      const degree = calculateDegrees()
      const answersToServer = getAnswers()
      setPageState({ isLoading: true, message: '' })
      const { data } = await axios.post(`/quiz/${activeQuiz?._id}/answer`, {
        degree,
        userID: currentUser._id,
        answers: answersToServer,
      })
      if (data.success) {
        setShowAnswers(true)
        setDegree(degree)
        setShowAnswers(true)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      toast.error(error?.response?.data?.message)
    } finally {
      setPageState({ isLoading: false, message: '' })
      setIsEnsure(false)
    }
  }

  const solvedNoShown = () => {
    const answeredQuestions = activeQuiz?.questions?.filter((q) => {
      if (Array.isArray(q?.answer)) {
        if (q?.answer?.length) return true
      } else if (q?.answer) {
        return true
      } else {
        return false
      }
    })
    return answeredQuestions?.length
  }

  const resetQuiz = () => {
    setCurrentUser(null)
    setShowAnswers(false)
    setDegree(0)
    console.log('asasd')
  }

  const onClickSubmit = () => {
    if (activeQuiz?.questions?.length - +solvedNoShown()) {
      setIsEnsure(true)
    } else {
      submitQuiz()
    }
  }

  const isUser =
    Boolean(currentUser) || Boolean(Object.keys(currentUser || {}).length > 0)

  console.log(activeQuiz?.questions?.length - +solvedNoShown())

  return pageState.isLoading ? (
    <PageLoader />
  ) : pageState.code === 'NO_ACTIVE_QUIZ' ? (
    <NoActiveQuiz />
  ) : pageState.message ? (
    <Typography align='center' variant='h4' component={'h2'} color={'error'}>
      {pageState.message}
    </Typography>
  ) : (
    <>
      <QuizHeader
        isUser={isUser}
        activeQuiz={activeQuiz}
        degree={degree}
        onClickSubmit={onClickSubmit}
        showAnswers={showAnswers}
        solvedNoShown={solvedNoShown()}
      />
      <Examiner
        quizID={activeQuiz?._id}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onCancelUser={resetQuiz}
      />
      {isUser && (
        <CustomPagination
          onPaginationChange={onPaginationChange}
          questionLength={activeQuiz?.questions.length}
          questionShown={questionShown}
        />
      )}
      {isUser ? (
        <>
          <Box overflow={'hidden'} mb={3}>
            <Box display={'flex'} width={'100%'} height={'100%'}>
              <Swiper
                ref={swiperRef}
                onSlideChangeTransitionEnd={(swiper) => {
                  console.log(swiper)
                  setQuestionShown(swiper.activeIndex + 1)
                }}
                spaceBetween={30}
              >
                {activeQuiz?.questions?.map((question, index) => {
                  return (
                    <SwiperSlide key={question._id}>
                      <SingleTask
                        _id={question._id}
                        onSolve={solveQuestion}
                        qusetion={question.question}
                        choices={question.choices}
                        i={index}
                        answer={question.answer}
                        showAnswers={showAnswers}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </Box>
          </Box>
        </>
      ) : null}
      <EnsureSubmitPortal
        open={
          isEnsure && Boolean(activeQuiz?.questions?.length - +solvedNoShown())
        }
        remainsQuestions={activeQuiz?.questions?.length - +solvedNoShown()}
        onSubmit={submitQuiz}
        onClose={() => setIsEnsure(false)}
      />
    </>
  )
}

export default Quiz

// import { useEffect, useState } from "react"
// import server from "../lib/axios"
// import { Stack } from "@mui/material"

// function Quiz() {
//  const [quiz, setQuiz] = useState({})
//  useEffect(()=>{
//   (async()=>{
//    const res = await server.get("/quizzes/active")
//    const quiz = res.data.data
//    setQuiz(quiz)
//   })()
//  }, [])
//   return <Stack >

//   </Stack>
// }

// export default Quiz
