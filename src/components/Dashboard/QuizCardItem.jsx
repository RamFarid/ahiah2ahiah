import CheckIcon from '@mui/icons-material/Check'
import { ButtonBase, Grid, IconButton, Paper, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import getRelativeTime from '../../utils/getRelativeTime'
function QuizCardItem({
  active,
  _id,
  title,
  showQuiz,
  updateActiveQuiz,
  isSavingLoading,
  createdAt,
}) {
  return (
    <Grid item xs={6} sx={{ position: 'relative' }}>
      <IconButton
        disabled={isSavingLoading}
        sx={(t) => ({
          position: 'absolute',
          top: 25,
          left: 25,
          border: active
            ? `solid 1px ${t.palette.success.main}`
            : `solid 1px ${t.palette.action.disabled}`,
          zIndex: 2,
          width: '25px',
          height: '25px',
        })}
        onClick={() => updateActiveQuiz(_id)}
      >
        <CheckIcon
          color={active ? 'success' : 'disabled'}
          sx={{ width: 20, height: 20 }}
        />
      </IconButton>
      <ButtonBase
        disabled={isSavingLoading}
        sx={{ display: 'block', width: '100%', height: '100%' }}
        onClick={() => showQuiz(_id)}
      >
        <Paper
          sx={(t) => ({
            padding: '6px',
            textAlign: 'center',
            minHeight: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            border: active
              ? `${t.palette.success.main} solid 3px`
              : `solid 1px ${t.palette.divider}`,
            color: active ? t.palette.success.main : t.palette.text.primary,
          })}
        >
          <Typography component={'h4'} variant='h6' fontWeight={700}>
            {title}
          </Typography>
          {/* <Typography
            component={'span'}
            align='center'
            variant='body1'
            fontWeight={400}
          >
            متبقي {members?.length}
          </Typography> */}
          <Typography
            component={'span'}
            align='center'
            variant='caption'
            color={'text.secondary'}
            fontWeight={400}
          >
            {getRelativeTime(createdAt)}
          </Typography>
        </Paper>
      </ButtonBase>
    </Grid>
  )
}

QuizCardItem.propTypes = {
  active: PropTypes.bool,
  _id: PropTypes.string,
  title: PropTypes.string,
  showQuiz: PropTypes.func,
  isSavingLoading: PropTypes.bool,
  updateActiveQuiz: PropTypes.func,
  createdAt: PropTypes.string,
}

export default QuizCardItem
