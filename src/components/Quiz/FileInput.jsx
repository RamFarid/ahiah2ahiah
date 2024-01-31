import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { QrCode2TwoTone } from '@mui/icons-material'

function FileInput({ onChange }) {
  return (
    <Box mt={1} border={'1px dotted'} position={'relative'} height={'200px'}>
      <Box
        component='input'
        type='file'
        id='media'
        multiple
        accept='image/*'
        onChange={onChange}
        width={'100%'}
        height={'100%'}
        sx={{ opacity: 0 }}
      />
      <Box
        component='label'
        htmlFor='media'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: '-50% -50%',
          textAlign: 'center',
        }}
      >
        <QrCode2TwoTone sx={{ width: 90, height: 90 }} color={'primary'} />
        <Typography component={'h3'} variant='h6'>
          اختار الـQR code بتاعك
        </Typography>
      </Box>
    </Box>
  )
}

FileInput.propTypes = {
  onChange: PropTypes.func,
}

export default FileInput
