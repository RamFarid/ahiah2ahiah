import {
  Autocomplete,
  Avatar,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import server from '../../lib/axios'
import CloseIcon from '@mui/icons-material/Close'

function Examiner({ currentUser, setCurrentUser, quizID, onCancelUser }) {
  const [searchName, setSearchName] = useState('')
  const [searchList, setSearchList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let ref
    if (!searchName || currentUser) return
    ;(async () => {
      ref = setTimeout(async () => {
        setIsLoading(true)
        const { data } = await server.get(`/persons/search?q=${searchName}`)
        if (!data.success) return toast.error(data.message)
        setIsLoading(false)
        setSearchList(data.data)
      }, 700)
    })()

    return () => {
      clearTimeout(ref)
    }
  }, [currentUser, searchName])

  return !currentUser || !Object.keys(currentUser || {}).length ? (
    <Autocomplete
      options={searchList}
      getOptionLabel={(option) => {
        return `${option.name}: ${option.grade}`
      }}
      loading={isLoading}
      onInputChange={(_e, newInputValue) => {
        setSearchName(newInputValue)
      }}
      onChange={(_e, v, r) => {
        if (r === 'clear') return
        setCurrentUser(v)
      }}
      getOptionDisabled={(opt) => {
        console.log(opt)
        return Boolean(opt?.quizzes?.find((u) => u.quiz_id === quizID))
      }}
      renderInput={(params) => (
        <TextField
          helperText='أتاكد من أسمك و من سنك'
          {...params}
          label='أكتب أسمك الأول'
          variant='outlined'
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>{isLoading ? <CircularProgress color='primary' /> : null}</>
            ),
          }}
        />
      )}
    />
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
