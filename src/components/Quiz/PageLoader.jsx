import { Box, CircularProgress } from '@mui/material'

function PageLoader() {
  return (
    <Box
      minHeight={'290px'}
      display='flex'
      justifyContent={'center'}
      alignItems={'center'}
    >
      <CircularProgress />
    </Box>
  )
}

export default PageLoader
