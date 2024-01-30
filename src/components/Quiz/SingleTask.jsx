import {
  Box,
  ButtonBase,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

function SingleTask({
  qusetion,
  i,
  choices,
  onSolve,
  _id,
  answer,
  showAnswers,
}) {
  return (
    <Box
      component={motion.div}
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '-100%' }}
      transition={{ duration: 5 }}
      p={1}
      width={'100%'}
      borderRadius={'6px'}
      height={'100%'}
      sx={{
        '&, & *': {
          userSelect: 'none',
        },
      }}
    >
      <FormControl sx={{ width: '100%', height: '100%' }}>
        <Typography
          align='center'
          component={motion.h4}
          initial={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 30,
            delay: 0.1,
            duration: 0.5,
          }}
          marginInlineEnd={2.3}
          marginBlockStart={2}
          p={1.3}
          mb={2}
          variant='h6'
          // border={(t) => '4px solid ' + t.palette.primary.dark}
          sx={{
            backgroundImage:
              'linear-gradient(to bottom left, #1C75BC, #27BBAF, #1C75BC)',
          }}
        >
          {i + 1}- {qusetion}
        </Typography>
        {showAnswers && !answer && (
          <Typography variant='caption' mb={2}>
            أنت محلتش السؤال ده
          </Typography>
        )}
        <RadioGroup
          sx={{
            m: 0,
            gap: 1.3,
            ml: 2,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows:
              choices.length <= 4
                ? '100px 100px'
                : choices?.length <= 6
                ? '100px 100px 100px'
                : '100px 100px 100px 100px',
          }}
          value={showAnswers ? choices?.find((c) => c.correct)?._id : answer}
          onChange={(_, value) => {
            if (showAnswers) return
            onSolve(_id, value)
          }}
        >
          {choices.map(({ choice, _id, correct }) => {
            return (
              <ButtonBase
                component={motion.div}
                initial={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 90,
                    damping: 24,
                    delay: 0.5,
                  },
                }}
                key={_id}
                // (correct && answer === _id && showAnswers) ||
                // (correct && showAnswers)
                // ? 'success'
                // : !correct && answer === _id && showAnswers
                // ? 'error'
                // : 'primary'
                sx={(t) => ({
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderImage: showAnswers
                    ? 'none'
                    : 'linear-gradient(to right, #1C75BC, #27BBAF) 1',
                  borderColor:
                    (correct && answer === _id && showAnswers) ||
                    (correct && showAnswers)
                      ? t.palette.success.dark
                      : !correct && answer === _id && showAnswers
                      ? t.palette.error.dark
                      : t.palette.action.disabled,
                  backgroundImage:
                    answer === _id && !showAnswers
                      ? `linear-gradient(to left, #27BBAF, #1C75BC, #27BBAF)`
                      : 'none',
                  borderRadius: '6px',
                  transition: 'all ease-out .4s',
                  backgroundColor:
                    answer === _id && showAnswers
                      ? t.palette.action.disabledBackground
                      : 'transparent',
                  zIndex: 1,
                })}
              >
                <FormControlLabel
                  value={_id}
                  label={choice}
                  disabled={showAnswers}
                  sx={(t) => ({
                    color:
                      (correct && answer === _id && showAnswers) ||
                      (correct && showAnswers)
                        ? t.palette.success.main
                        : !correct && answer === _id && showAnswers
                        ? t.palette.error.main
                        : 'primary',
                    m: 0,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  })}
                  control={
                    <Radio
                      sx={(t) => ({
                        display: 'none',
                        color:
                          (correct && answer === _id && showAnswers) ||
                          (correct && showAnswers)
                            ? t.palette.success.main
                            : !correct && answer === _id && showAnswers
                            ? t.palette.error.main
                            : 'primary',
                      })}
                    />
                  }
                />
              </ButtonBase>
            )
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

SingleTask.propTypes = {
  qusetion: PropTypes.string,
  choices: PropTypes.array,
  i: PropTypes.number,
  answer: PropTypes.string,
  onSolve: PropTypes.func,
  _id: PropTypes.string,
  showAnswers: PropTypes.bool,
}

export default SingleTask
