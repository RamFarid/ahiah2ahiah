import { Box } from '@mui/material'

function TableLoader() {
  return (
    <Box
      sx={{
        width: '60px',
        height: '60px',
        display: 'block',
        margin: '20px auto',
        position: 'relative',
        background: `radial-gradient(ellipse at center, #FFF 69%, rgba(0, 0, 0, 0) 70%),
    linear-gradient(to right, rgba(0, 0, 0, 0) 47%, #FFF 48%, #FFF 52%, rgba(0, 0, 0, 0) 53%)`,
        backgroundSize: '20px 20px, 20px auto',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center bottom, center -5px',
        boxSizing: 'border-box',
        '&::before, &::after': {
          content: "''",
          boxSizing: 'border-box',
          position: 'absolute',
          left: '-20px',
          top: '0',
          width: '20px',
          height: '60px',
          background: `
    radial-gradient(ellipse at center, #FFF 69%, rgba(0, 0, 0, 0) 70%),
    linear-gradient(to right, rgba(0, 0, 0, 0) 47%, #FFF 48%, #FFF 52%, rgba(0, 0, 0, 0) 53%)`,
          backgroundSize: '20px 20px, 20px auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom, center -5px',
          transform: 'rotate(0deg)',
          transformOrigin: '50% 0%',
          animation: 'animPend 1s linear infinite alternate',
        },
        '&::after': {
          animation: 'animPend2 1s linear infinite alternate',
          left: '100%',
        },
        '@keyframes animPend': {
          '0%': {
            transform: 'rotate(22deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
        },
        '@keyframes animPend2': {
          '0%, 55%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(-22deg)',
          },
        },
      }}
    />
  )
}

export default TableLoader
