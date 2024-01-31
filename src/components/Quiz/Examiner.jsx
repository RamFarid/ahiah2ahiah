import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import jsQR from 'jsqr'
import FileInput from './FileInput'
import { useState } from 'react'
import server from '../../lib/axios'
import { toast } from 'react-toastify'
import PageLoader from './PageLoader'

function Examiner({ currentUser, setCurrentUser, quizID, onCancelUser }) {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getPersonWithID = async (id) => {
    try {
      setIsLoading(true)
      const { data } = await server.get(`/persons/${id}/cansolve/${quizID}`)
      if (!data.success) setMessage(data.message)
      setCurrentUser(data.data)
    } catch (error) {
      setMessage(error?.response?.data?.message || error.message)
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onFileInput = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = function (event) {
      const image = new Image()
      image.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)

        if (code) {
          getPersonWithID(code.data)
        } else {
          setMessage('الصورة مفيهاش QR code')
        }
        canvas.remove()
      }
      image.src = event.target.result
    }

    reader.readAsDataURL(file)
  }

  return isLoading ? (
    <PageLoader />
  ) : message ? (
    <>
      <Typography
        align='center'
        color={'error'}
        variant='h6'
        component={'h2'}
        p={1}
        borderRadius={'2px'}
        border={(t) => `1px solid ` + t.palette.text.primary}
      >
        {message}
      </Typography>
      <Box textAlign={'center'}>
        <Button
          color='primary'
          sx={{ m: 'auto' }}
          onClick={() => {
            setCurrentUser(null)
            setMessage('')
          }}
        >
          جرب تاني
        </Button>
      </Box>
    </>
  ) : !currentUser || !Object.keys(currentUser || {}).length ? (
    <>
      <FileInput onChange={onFileInput} />
    </>
  ) : (
    <ListItem
      sx={{ direction: 'ltr', listStyle: 'none' }}
      ContainerProps={{ style: { listStyle: 'none' } }}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={currentUser?.name}
        secondary={currentUser?.church}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={onCancelUser}>
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

Examiner.propTypes = {
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  quizID: PropTypes.string,
  onCancelUser: PropTypes.func,
}

export default Examiner

// useEffect(() => {
//   let ref
//   if (!searchName || currentUser) return
//   ;(async () => {
//     ref = setTimeout(async () => {
//       setIsLoading(true)
//       const { data } = await server.get(`/persons/search?q=${searchName}`)
//       if (!data.success) return toast.error(data.message)
//       setIsLoading(false)
//       setSearchList(data.data)
//     }, 700)
//   })()

//   return () => {
//     clearTimeout(ref)
//   }
// }, [currentUser, searchName])

// <Autocomplete
//   options={searchList}
//   getOptionLabel={(option) => {
//     return `${option.name}: ${
//       option.grade === 1 ? 'أولى' : option.grade === 2 ? 'تانيه' : 'تالته'
//     }`
//   }}
//   loading={isLoading}
//   onInputChange={(_e, newInputValue) => {
//     setSearchName(newInputValue)
//   }}
//   onChange={(_e, v, r) => {
//     if (r === 'clear') return
//     setCurrentUser(v)
//   }}
//   getOptionDisabled={(opt) => {
//     console.log(opt)
//     return Boolean(opt?.quizzes?.find((u) => u.quiz_id === quizID))
//   }}
//   renderInput={(params) => (
//     <TextField
//       helperText='أتاكد من أسمك و من سنك'
//       {...params}
//       label='أكتب أسمك الأول'
//       variant='outlined'
//       fullWidth
//       InputProps={{
//         ...params.InputProps,
//         endAdornment: (
//           <>{isLoading ? <CircularProgress color='primary' /> : null}</>
//         ),
//       }}
//     />
//   )}
// />
