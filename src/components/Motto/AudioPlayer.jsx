import { IconButton, Slider, Stack, Typography, styled } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import formatTime from '../../utils/formatTime'

function AudioPlayer() {
  const [player, setPlayer] = useState(false)
  const [currentDuration, setCurrentDuration] = useState(0)
  const [duration, setDuration] = useState(0)
  const mottoRef = useRef(new Audio('/motto.mp3'))

  useEffect(() => {
    const motto = mottoRef.current
    motto.load()
    motto.preload = true
    const loadeddataHandler = () => {
      setDuration(motto.duration)
    }
    const playHandler = () => {
      motto.muted = false
      setPlayer(true)
    }
    const pauseHanlder = () => {
      setPlayer(false)
    }
    const timeUpdateHandler = () => {
      setCurrentDuration(motto.currentTime)
    }
    motto.addEventListener('loadeddata', loadeddataHandler)
    motto.addEventListener('play', playHandler)
    motto.addEventListener('pause', pauseHanlder)
    motto.addEventListener('timeupdate', timeUpdateHandler)

    return () => {
      motto.removeEventListener('loadeddata', loadeddataHandler)
      motto.removeEventListener('play', playHandler)
      motto.removeEventListener('pause', pauseHanlder)
      motto.removeEventListener('timeupdate', timeUpdateHandler)
    }
  }, [])

  const playMotto = () => {
    const motto = mottoRef.current
    if (motto) {
      motto.play()
    }
  }
  const pauseMotto = () => mottoRef.current.pause()
  const toggleMotto = () => {
    if (player) return pauseMotto()
    playMotto()
  }
  return (
    <Stack
      width={'89%'}
      mx={'auto'}
      my={2}
      bgcolor={'background.default'}
      borderRadius={'5px'}
      py={1}
      px={2.4}
      sx={(theme) => {
        return {
          border: '1px solid ' + theme.palette.divider,
        }
      }}
    >
      <Typography align='center' fontWeight={700}>
        أسمع الشعار
      </Typography>
      <Stack>
        <Slider
          aria-label='الشعار'
          size='small'
          onChange={(_, v) => {
            mottoRef.current.currentTime = v
          }}
          min={0}
          max={Math.floor(duration)}
          valueLabelDisplay='auto'
          value={Math.floor(currentDuration)}
          step={1}
        />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='caption' component={'span'}>
            {formatTime(duration)}
          </Typography>
          <Typography variant='caption' component={'span'}>
            {formatTime(currentDuration)}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
        <CustomBtn disabled>
          <SkipNextIcon />
        </CustomBtn>
        <CustomBtn onClick={toggleMotto}>
          {player ? <PauseIcon /> : <PlayArrowIcon />}
        </CustomBtn>
        <CustomBtn disabled>
          <SkipPreviousIcon />
        </CustomBtn>
      </Stack>
    </Stack>
  )
}

const CustomBtn = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
}))

export default AudioPlayer
