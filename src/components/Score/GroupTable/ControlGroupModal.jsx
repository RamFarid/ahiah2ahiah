import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useScore } from '../../../Contexts/ScoreContext'
import { useUser } from '../../../Contexts/UserContext'
import server from '../../../lib/axios'
import PropTypes from 'prop-types'

function ControlGroupModal({ group, open, onClose }) {
  const { addNewGroup, updateGroup } = useScore()
  const { online } = useUser()
  const [name, setName] = useState('')
  const [points, setPoints] = useState('')
  const [errors, setErrors] = useState({ name: '', points: '' })
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (Object.keys(group).length) {
      setName(group.name)
    }
  }, [group])

  const handleGroupMadal = async () => {
    if (!online) return toast('طب ما انت معكش نت')
    const upoints = Number(points)
    const uname = name.trim()
    if (!upoints && upoints !== 0) {
      setErrors((pre) => ({ ...pre, points: 'دخل الرقم' }))
      return
    }
    try {
      setIsLoading(true)
      if (Object.keys(group).length === 0) {
        const response = await server.post('/groups/new', {
          name: uname,
          points: upoints,
        })
        const data = response.data
        if (data.success) {
          toast.success(data.message)
          addNewGroup(data.data)
          return
        }
        toast.error(data.message)
        return
      }
      const response = await server.put(`groups/${group._id}`, {
        name: uname,
        points: upoints + group.points,
      })
      const data = response.data
      if (data.success) {
        toast.success(data.message)
        updateGroup(data.data)
        return
      }
      toast.error(data.message)
      return
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
      closeHandler()
    }
  }

  const closeHandler = () => {
    setName('')
    setPoints('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>
        {Object.keys(group).length > 0 ? 'تعديل مجموعة ' : 'اضافة مجموعه جديده'}
        <Typography
          color={'primary'}
          component={'span'}
          fontSize={'inherit'}
          fontWeight={'inherit'}
        >
          {group.name}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ overflow: 'hidden' }}>
        <TextField
          value={name}
          margin='dense'
          size='small'
          fullWidth
          sx={{ marginInlineEnd: 1.5 }}
          label='أسم المجموعه'
          type='text'
          required
          error={Boolean(errors.name.length)}
          helperText={errors.name.length ? errors.name : ''}
          onChange={(e) => {
            setErrors((pre) => ({ ...pre, name: '' }))
            const value = e.target.value
            if (value.trim().length > 20) {
              setErrors((pre) => ({ ...pre, name: 'الاسم طويل كده' }))
              setName(value)
            }
            setName(value)
          }}
        />
        <Stack direction={'row'} my={2} gap={2}>
          <TextField
            defaultValue={group.points}
            size='small'
            disabled
            type='number'
            label='النقط'
            sx={{
              flex: 4,
              display: Object.keys(group).length ? 'inline-flex' : 'none',
            }}
          />
          <TextField
            value={points}
            error={Boolean(errors.points.length)}
            helperText={errors.points.length ? errors.points : ''}
            label={group?.points ? 'تعديل بـ' : 'النقط'}
            type='number'
            size='small'
            sx={{ flex: 2 }}
            onChange={(e) => {
              setErrors((pre) => ({ ...pre, points: '' }))
              setPoints(e.target.value.trim())
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color='error'>
          اغلاق
        </Button>
        <Button
          onClick={handleGroupMadal}
          disabled={
            isLoading ||
            Boolean(errors.name.length) ||
            Boolean(errors.points.length) ||
            !name.trim().length ||
            !points.length ||
            (name.trim() === group.name &&
              Number(points) === Number(group.points))
          }
        >
          {isLoading ? 'بيحمل' : 'حفظ'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ControlGroupModal.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    points: PropTypes.number,
  }),
  onClose: PropTypes.func,
  open: PropTypes.bool,
}

export default ControlGroupModal
