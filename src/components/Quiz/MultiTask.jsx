import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

function MultiTask({
  qusetion,
  choices,
  i,
  onSolve,
  _id: questionID,
  answer: questionAnswer = [],
  showAnswers,
}) {
  return (
    <>
      <FormControl>
        <Typography component={'h4'}>
          {i + 1}- {qusetion}
        </Typography>
        {choices.map(({ choice, _id, correct }) => {
          const checkedChosen = questionAnswer?.includes(_id)
          return (
            <FormControlLabel
              key={_id}
              value={_id}
              label={choice}
              control={
                <Checkbox
                  color={
                    (correct && checkedChosen && showAnswers) ||
                    (correct && showAnswers)
                      ? 'success'
                      : !correct && checkedChosen && showAnswers
                      ? 'error'
                      : 'primary'
                  }
                  checked={
                    showAnswers ? correct || checkedChosen : checkedChosen
                  }
                  onChange={(_, checked) => {
                    if (showAnswers) return
                    if (checked) {
                      onSolve(questionID, [...questionAnswer, _id])
                    } else {
                      const updatedAnswers = questionAnswer?.filter(
                        (q) => q !== _id
                      )
                      onSolve(questionID, updatedAnswers)
                    }
                  }}
                />
              }
            />
          )
        })}
      </FormControl>
    </>
  )
}

MultiTask.propTypes = {
  qusetion: PropTypes.string,
  choices: PropTypes.array,
  i: PropTypes.number,
  answer: PropTypes.array,
  _id: PropTypes.string,
  onSolve: PropTypes.func,
  showAnswers: PropTypes.bool,
}

export default MultiTask
