import { Box, Button, Stack, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import hymns from '../data/hymns'
import { useSwipeable } from 'react-swipeable'

function Hymn() {
  const navigate = useNavigate()
  const { hymn } = useParams()
  const swipes = useSwipeable({
    onSwipedRight: (e) => {
      navigate(
        targetIndex !== hymns.length - 1 &&
          (targetHymn
            ? `/hymn/${hymns[targetIndex + 1]?.slug}`
            : `/hymn/${hymns[0].slug}`)
      )
    },
    onSwipedLeft: (e) => {
      navigate(
        targetIndex !== 0 && targetHymn
          ? `/hymn/${hymns[targetIndex - 1]?.slug}`
          : `/hymn/${hymns[0].slug}`
      )
    },
  })
  const getTargetHymn = () => {
    const targetHymn = hymns.find((h) => h.slug === hymn)
    if (targetHymn) {
      return targetHymn
    }
    return false
  }
  const targetHymn = getTargetHymn()

  const targetIndex = (function getTargetIndex() {
    const targetHymnIndex = hymns.findIndex((h) => h.slug === targetHymn.slug)
    return targetHymnIndex
  })()

  return (
    <Box {...swipes} minHeight={'85vh'}>
      <Stack
        mb={2}
        direction='row'
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Button
          startIcon={<ArrowForwardIosRoundedIcon fontSize='large' />}
          disabled={targetIndex === 0}
          component={Link}
          to={
            targetIndex !== 0 && targetHymn
              ? `/hymn/${hymns[targetIndex - 1]?.slug}`
              : `/hymn/${hymns[0].slug}`
          }
          sx={{
            gap: '5px',
            flex: 1,
          }}
        >
          <Typography noWrap fontSize='12px'>
            {targetIndex === 0
              ? 'الأول'
              : hymns[targetIndex - 1]?.slug?.replace(/-/g, ' ')}
          </Typography>
        </Button>

        <Button
          endIcon={<ArrowBackIosRoundedIcon fontSize='large' />}
          disabled={targetIndex === hymns.length - 1}
          sx={{
            gap: '5px',
            flex: 1,
          }}
          component={Link}
          to={
            targetIndex !== hymns.length - 1 &&
            (targetHymn
              ? `/hymn/${hymns[targetIndex + 1]?.slug}`
              : `/hymn/${hymns[0].slug}`)
          }
        >
          <Typography fontSize='12px' noWrap>
            {targetIndex === hymns.length - 1
              ? 'الأخر'
              : hymns[targetIndex + 1]?.slug?.replace(/-/g, ' ')}
          </Typography>
        </Button>
      </Stack>
      <Typography
        align='center'
        flex={2}
        variant='h4'
        color={'primary'}
        component={'h2'}
        sx={{ textDecoration: 'underline' }}
      >
        محفوظه
      </Typography>

      {targetHymn ? (
        targetHymn.component
      ) : (
        <Typography
          align='center'
          justifyContent={'center'}
          alignItems={'center'}
          variant='h5'
        >
          مفيش ترنيمه أو محفوظه بالأسم ده
          <br />
          <Typography color={'error'} variant='h5' component={'span'}>
            "{hymn.replace(/-/g, ' ')}"
          </Typography>
        </Typography>
      )}
    </Box>
  )
}

export default Hymn
