import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { useSwipeable } from 'react-swipeable'
import StepperDay from '../components/Day/StepperDay'
import daysProgramme from '../data/daysProgramme'
function Day() {
  const { day } = useParams()
  const navigate = useNavigate()
  const swipes = useSwipeable({
    onSwipedLeft: () => {
      navigate(
        day === 'الخميس'
          ? ''
          : day === 'الجمعه'
          ? '/day/الخميس'
          : day === 'السبت'
          ? '/day/الجمعه'
          : '/day/الخميس'
      )
    },
    onSwipedRight: () => {
      navigate(
        day === 'السبت'
          ? ''
          : day === 'الجمعه'
          ? '/day/السبت'
          : day === 'الخميس'
          ? '/day/الجمعه'
          : '/day/الخميس'
      )
    },
  })
  return (
    <Box mb={5} {...swipes}>
      <Stack
        mb={2}
        direction='row'
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Button
          startIcon={<ArrowForwardIosRoundedIcon fontSize='large' />}
          component={Link}
          disabled={day === 'الخميس'}
          to={
            day === 'الخميس'
              ? ''
              : day === 'الجمعه'
              ? '/day/الخميس'
              : day === 'السبت'
              ? '/day/الجمعه'
              : '/day/الخميس'
          }
          sx={{
            gap: '5px',
            flex: 1,
          }}
        >
          <Typography noWrap fontSize='12px'>
            {day === 'الخميس'
              ? 'الأول'
              : day === 'الجمعه'
              ? 'الخميس'
              : day === 'السبت'
              ? 'الجمعه'
              : null}
          </Typography>
        </Button>

        <Button
          endIcon={<ArrowBackIosRoundedIcon fontSize='large' />}
          disabled={day === 'السبت'}
          sx={{
            gap: '5px',
            flex: 1,
          }}
          to={
            day === 'السبت'
              ? ''
              : day === 'الجمعه'
              ? '/day/السبت'
              : day === 'الخميس'
              ? '/day/الجمعه'
              : '/day/الخميس'
          }
          component={Link}
        >
          <Typography fontSize='12px' noWrap>
            {day === 'السبت'
              ? 'الأخير'
              : day === 'الجمعه'
              ? 'السبت'
              : day === 'الخميس'
              ? 'الجمعه'
              : null}
          </Typography>
        </Button>
      </Stack>
      <Typography align='center' mb={4} component={'h2'} variant='h3'>
        {day}
      </Typography>
      <StepperDay
        list={
          day === 'الخميس'
            ? daysProgramme.daythursday
            : day === 'الجمعه'
            ? daysProgramme.dayfriday
            : daysProgramme.daysaturday
        }
      />
    </Box>
  )
}

export default Day
