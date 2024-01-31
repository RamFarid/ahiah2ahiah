import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { SwiperSlide, Swiper } from 'swiper/react'
import SingleTask from '../Quiz/SingleTask'
import server from '../../lib/axios'
import { useQuiz } from '../../Contexts/QuizContext'
import { toast } from 'react-toastify'
import { useState } from 'react'
import getRelativeTime from '../../utils/getRelativeTime'

function Statistics({ canOpen, currentStatistics, closeStatistics }) {
  const { updatePerson } = useQuiz()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Modal
      open={canOpen}
      onClose={closeStatistics}
      sx={{
        display: {
          xs: 'block',
          md: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Slide direction={'up'} unmountOnExit in={canOpen}>
        <Box
          height={{
            xs: '100vh',
            md: '500px',
          }}
          width={{
            xs: '100%',
            md: '450px',
          }}
          margin={'auto'}
          bgcolor='background.default'
          p={2}
          borderRadius='10px'
        >
          {canOpen && (
            <>
              <Stack
                direction='row'
                mb={3}
                alignItems='center'
                justifyContent='space-between'
                sx={(theme) => ({
                  borderBottom: `1px solid ${theme.palette.divider}`,
                })}
              >
                <Stack direction='row' alignItems='center' gap={3}>
                  <IconButton
                    size='large'
                    sx={{ color: 'text.primary' }}
                    onClick={closeStatistics}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                  <Typography component='h2' variant='h6'>
                    احصائيات{' '}
                    <Typography
                      component={'span'}
                      variant='inherit'
                      color={'primary'}
                    >
                      {currentStatistics.personName}
                    </Typography>{' '}
                    لكويز {`"${currentStatistics.title}"`}
                  </Typography>
                </Stack>
              </Stack>
              <Box overflow={'hidden'} mb={3}>
                <Stack
                  direction={'row-reverse'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'flex-end'}
                    flexDirection={'column'}
                  >
                    <Typography
                      color={(t) =>
                        t.palette.mode === 'dark' ? '#000' : '#fff'
                      }
                      fontWeight={900}
                      align='center'
                      bgcolor={(t) =>
                        t.palette.mode === 'dark' ? '#fff' : '#000'
                      }
                      width={'fit-content'}
                      borderRadius={'7px'}
                      p={0.6}
                    >
                      {currentStatistics.degree}/
                      {currentStatistics?.questions?.length}
                    </Typography>
                    <Typography
                      fontWeight={700}
                      dir='ltr'
                      variant='caption'
                      color={'text.secondary'}
                    >
                      Solved: {getRelativeTime(currentStatistics.createdAt)}
                    </Typography>
                  </Box>
                  <Button
                    onClick={async () => {
                      try {
                        setIsLoading(true)
                        const { data } = await server.put(
                          `/persons/${currentStatistics.personID}/deletequiz`,
                          { quizID: currentStatistics._id }
                        )
                        updatePerson(data.data)
                        toast.success('تم مسح الإحصائيه')
                        closeStatistics()
                      } catch (error) {
                        toast.error(
                          error?.response?.data?.message || error?.message
                        )
                      } finally {
                        setIsLoading(false)
                      }
                    }}
                    color='error'
                    sx={{ gap: 1 }}
                    disabled={isLoading}
                    endIcon={
                      isLoading && <CircularProgress size={20} color='error' />
                    }
                    variant='outlined'
                  >
                    مسح هذه الإحصائيه
                  </Button>
                </Stack>
                <Box display={'flex'} width={'100%'} height={'100%'}>
                  <Swiper spaceBetween={30}>
                    {currentStatistics?.questions?.map((question, index) => {
                      return (
                        <SwiperSlide key={question._id}>
                          <SingleTask
                            _id={question._id}
                            qusetion={question.question}
                            choices={question.choices}
                            i={index}
                            answer={question.answer}
                            showAnswers={true}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Slide>
    </Modal>
  )
}

Statistics.propTypes = {
  currentStatistics: PropTypes.object,
  canOpen: PropTypes.bool,
  closeStatistics: PropTypes.func,
}

export default Statistics
