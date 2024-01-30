import { Pagination, Stack } from '@mui/material'
import PropTypes from 'prop-types'
function CustomPagination({
  onPaginationChange,
  questionShown,
  questionLength,
}) {
  return (
    <Stack
      spacing={1}
      mt={3}
      sx={{
        backgroundImage: 'linear-gradient(to bottom right, #1C75BC, #27BBAF)',
      }}
      py={1}
      borderRadius={'6px'}
    >
      <Pagination
        page={questionShown}
        color='primary'
        count={questionLength}
        size='small'
        sx={{
          '& ul li:nth-child(1)': {
            rotate: '180deg',
          },
          '& ul li:last-child': {
            rotate: '180deg',
          },
          '&, & nav': {
            direction: 'rtl',
          },
          mx: 'auto !important',
        }}
        onChange={onPaginationChange}
      />
    </Stack>
  )
}

CustomPagination.propTypes = {
  onPaginationChange: PropTypes.func,
  questionLength: PropTypes.number,
  questionShown: PropTypes.number,
}

export default CustomPagination
