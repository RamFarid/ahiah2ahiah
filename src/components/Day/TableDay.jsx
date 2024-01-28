import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import PropTypes from 'prop-types'

function TableDay({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='thursday table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>من</TableCell>
            <TableCell
              align='center'
              sx={{
                p: 0,
                borderRight: (t) => '1px solid ' + t.palette.divider,
                borderLeft: (t) => '1px solid ' + t.palette.divider,
              }}
            >
              إلى
            </TableCell>
            <TableCell align='center' colSpan={3}>
              الموضوع
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.name}>
              <TableCell align='center'>{row.from}</TableCell>
              <TableCell
                align='center'
                sx={{
                  borderRight: (t) => '1px solid ' + t.palette.divider,
                  borderLeft: (t) => '1px solid ' + t.palette.divider,
                }}
              >
                {row.to}
              </TableCell>
              <TableCell align='center' colSpan={3}>
                {row.topic}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

TableDay.propTypes = {
  data: PropTypes.array,
}

export default TableDay
