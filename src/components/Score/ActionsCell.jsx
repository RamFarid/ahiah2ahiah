import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, TableCell } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLongPress } from 'use-long-press'

function ActionsCell({ onDelete, onEdit, isLoading, onHold }) {
  const [isLongPress, setIsLongPress] = useState(false)
  const [isScoreUp, setIsScoreUp] = useState(false)
  const bindLongPress = useLongPress(
    async (e) => {
      e.preventDefault()
      try {
        setIsScoreUp(true)
        if (onHold) {
          await onHold()
        }
      } catch (error) {
        toast.error('مشكلة.. :', error.message)
      } finally {
        setIsScoreUp(false)
      }
      setIsLongPress(true)
    },
    {
      onCancel: (e) => {
        e.preventDefault()
        setIsLongPress(false)
      },
    }
  )

  const editHandler = () => {
    if (!isLongPress) onEdit()
  }

  const btnStyle = {
    width: '20px',
    height: '20px',
  }
  return (
    <TableCell sx={{ py: 0.5 }}>
      <Box display={'flex'}>
        <IconButton
          color='error'
          disabled={isLoading || isScoreUp}
          onClick={onDelete}
        >
          <Delete sx={btnStyle} />
        </IconButton>
        <IconButton
          color='primary'
          disabled={isLoading || isScoreUp}
          onClick={editHandler}
          {...bindLongPress()}
        >
          <Edit sx={btnStyle} />
        </IconButton>
      </Box>
    </TableCell>
  )
}

export default ActionsCell
