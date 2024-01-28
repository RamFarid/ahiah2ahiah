import { Alert, AlertTitle, Box } from '@mui/material'
import snail from '../../assets/sbail-transparent.png'
function AppNotes() {
  return (
    <Alert
      severity='error'
      sx={{ gap: '10px' }}
      icon={
        <Box
          component={'img'}
          src={snail}
          maxWidth={'32px'}
          display={'inline-block'}
          maxHeight={'32px'}
        />
      }
    >
      <AlertTitle>ملَحوظه</AlertTitle>
      تعرف أن كلمة باملفت اصلها انجليزي (pamphlet) و اللي معناها كُتيب
    </Alert>
  )
}

export default AppNotes
