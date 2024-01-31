import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import server from '../lib/axios'
import { useUser } from './UserContext'

export const useQuiz = () => useContext(QuizContext)

const QuizContext = createContext()

function QuizContextProvider({ children }) {
  const { isLoggedIn } = useUser()
  const [quizzes, setQuizzes] = useState([])
  const [fullPersons, setFullPersons] = useState([])
  const [pageState, setPageState] = useState({
    isQuizLoading: true,
    isStatisticsLoading: true,
    isSavingLoading: false,
  })

  useEffect(() => {
    if (!isLoggedIn) return // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        setPageState((pre) => ({ ...pre, isQuizLoading: true }))
        const { data: quizData } = await server.get('/quiz')
        const { data: personData } = await server.get('/persons/admin')
        setPageState((pre) => ({ ...pre, isQuizLoading: false }))
        setQuizzes(quizData.data)
        setFullPersons(personData.data)
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
      }
    })()
  }, [isLoggedIn])

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

  const updatePerson = (updatedPerson) => {
    const target = fullPersons.map((p) =>
      p._id === updatedPerson._id ? { ...p, ...updatedPerson } : p
    )
    setFullPersons(target)
  }

  const removePerson = (personID) => {
    const target = fullPersons.filter((p) => p._id !== personID)
    setFullPersons(target)
  }

  const quizzesOntoTable = useMemo(() => {
    const quizzesOntoTableArray = []
    fullPersons.forEach((person) => {
      const personRow = { name: person.name, _id: person._id }
      quizzes.forEach((quiz, quizIndex) => {
        const targetQuiz = person.quizzes.find((q) => q.quiz_id === quiz._id)
        if (targetQuiz) {
          personRow[quizIndex] = targetQuiz.degree
        } else {
          personRow[quizIndex] = '-'
        }
      })
      personRow.sumDegrees = person.quizzes.reduce((pre, acc) => {
        return pre + acc.degree
      }, 0)
      personRow.sumPoints =
        person.quizzes.reduce((pre, acc) => {
          return pre + acc.degree
        }, 0) + person.points
      quizzesOntoTableArray.push(personRow)
    })
    quizzesOntoTableArray.sort((a, b) => b.sumPoints - a.sumPoints)
    return quizzesOntoTableArray
  }, [fullPersons, quizzes])

  const getQuizPerson = (personID, quizID) => {
    const targetPerson = fullPersons.find((p) => p._id === personID)
    const targetQuizStatistics = targetPerson.quizzes.find(
      (q) => q.quiz_id === quizID
    )
    const targetQuiz = quizzes.find((q) => q._id === quizID)
    const finalQuiz = {
      ...targetQuizStatistics,
      title: targetQuiz.title,
      personID,
      personName: targetPerson.name,
      _id: quizID,
      questions: targetQuiz.questions.map((q) => {
        const tq = targetQuizStatistics.questions_solve.find(
          (c) => c.question_id === q._id
        )
        return {
          ...q,
          answer: tq.answer,
        }
      }),
    }
    console.log(finalQuiz)
    return finalQuiz
  }

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        persons: fullPersons,
        pageState,
        quizzesOntoTable,
        getQuizPerson,
        updateActiveQuiz,
        removePerson,
        updatePerson,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

QuizContextProvider.propTypes = {
  children: PropTypes.any,
}

export default QuizContextProvider

// persons.map((person) => {
//   return (
//     <TableRow
//       key={person._id}
//       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//     >
//       <TableCell align='right'>{person.name}</TableCell>

//       {person?.quizzes || person?.quizzes?.length ? (
//         <>
//           {quizzesG.map((quizG, i) => {
//             const targetQuiz = person.quizzes.find(
//               (q) => q.quiz_id === quizG._id
//             )
//             return (
//               <TableCell
//                 key={targetQuiz?._id || i + person._id}
//                 component='th'
//                 scope='row'
//                 align='center'
//               >
//                 {targetQuiz?.degree || '-'}
//               </TableCell>
//             )
//           })}
//           <TableCell
//             key={person?._id}
//             component='th'
//             scope='row'
//             align='center'
//             sx={{
//               borderRight: (t) =>
//                 '1px solid ' + t.palette.divider + ' !important',
//             }}
//           >
//             {person.quizzes.reduce((pre, acc) => {
//               return pre + acc.degree
//             }, 0)}
//           </TableCell>
//           <TableCell
//             key={person?._id + 1}
//             component='th'
//             scope='row'
//             align='center'
//             sx={{
//               borderRight: (t) =>
//                 '1px solid ' + t.palette.divider + ' !important',
//             }}
//           >
//             {person.quizzes.reduce((pre, acc) => {
//               return pre + acc.degree
//             }, 0) + person.points}
//           </TableCell>
//         </>
//       ) : (
//         <>
//           {quizzesG.map((_, i) => (
//             <TableCell component='th' scope='row' key={i + 2} align='center'>
//               -
//             </TableCell>
//           ))}
//           <TableCell
//             component='th'
//             scope='row'
//             align='center'
//             sx={{
//               borderRight: (t) =>
//                 '1px solid ' + t.palette.divider + ' !important',
//             }}
//           >
//             0
//           </TableCell>
//         </>
//       )}
//     </TableRow>
//   )
// })
