import { Button, TableCell, TableRow, Typography } from '@mui/material'
import { useUser } from '../../Contexts/UserContext'
import PropTypes from 'prop-types'
function TableHeader({ txt, actoionText, actionHandler, columns }) {
  const { isLoggedIn } = useUser()
  return (
    <TableRow sx={{ bgcolor: 'primary.main' }}>
      <TableCell colSpan={columns - 1} align='center' sx={{ py: 1.4 }}>
        <Typography
          fontWeight={700}
          fontSize='16px'
          color={'#fff'}
          component={'h2'}
        >
          {txt}
        </Typography>
      </TableCell>
      {isLoggedIn && (
        <TableCell colSpan={1}>
          <Button
            onClick={actionHandler}
            color='success'
            // sx={{ bgcolor: '#fff' }}
            variant='contained'
            size='small'
            disabled={!isLoggedIn}
          >
            {actoionText}
          </Button>
        </TableCell>
      )}
    </TableRow>
  )
}

TableHeader.propTypes = {
  txt: PropTypes.string,
  actoionText: PropTypes.string,
  actionHandler: PropTypes.func,
  columns: PropTypes.number,
}

export default TableHeader
