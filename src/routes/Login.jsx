import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useUser } from '../Contexts/UserContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import deep from '../assets/deep-bg.jpg'
import server from '../lib/axios'

function Login() {
  const redirect = useNavigate()
  const [userPassword, setUserPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { setIsLoggedIn, isLoggedIn } = useUser()
  const [searchParams] = useSearchParams()
  const nextDestination = searchParams.get('next')
  if (isLoggedIn) return redirect('/', { replace: true })

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await server.post(`/auth/login`, {
        password: userPassword,
      })
      const data = response.data
      if (!data.success) return setError(data.message)
      toast.success(data.message)
      localStorage.setItem('password', data.data)
      server.defaults.headers.common['Authorization'] = data.data
      setIsLoggedIn(true)
      redirect(nextDestination ? `/${nextDestination}` : '/')
    } catch (error) {
      toast.error(
        error.message === `Failed to fetch`
          ? 'تقريبا معكش نت مش عارف اجيب البيانات'
          : error.message
      )
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Box
      width='100%'
      height={'100vh'}
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: `url("${deep}")`,
      }}
    >
      <Header />
      <Box
        width='100%'
        height={'calc(100% - 76px)'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          background: 'rgba(0, 0, 0, 25%)',
          borderRadius: 2,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10.5px)',
        }}
      >
        <Stack
          component={'form'}
          border={'3px solid #ddd'}
          width={'87%'}
          maxWidth={'370px'}
          borderRadius={'32px'}
          p={4}
          onSubmit={submitHandler}
        >
          <Typography
            component={'h1'}
            variant='h4'
            mx={'auto'}
            borderRadius={'60px'}
            border={'3px solid #ddd'}
            px={2}
            py={1}
            mb={'30px'}
            bgcolor='transparent'
            color='#ddd'
          >
            اثبت انك خادم
          </Typography>
          <TextField
            autoComplete='off'
            sx={{
              mb: 2,
              color: '#fff',
              '& input': {
                color: '#ddd',
              },
              '& fieldset': {
                border: '1px solid #ddd',
              },
              '&:hover fieldset': {
                borderColor: '#ddd !important',
              },
            }}
            required
            type='text'
            size='small'
            label='اكتب باسورد الخدام 🔪'
            margin='dense'
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value)
              setError('')
            }}
            error={Boolean(error.length)}
            helperText={error}
          />
          <Button variant='contained' type='submit' disabled={isLoading}>
            {isLoading ? 'بشوف انت خادم ولا لا...' : 'اتأكد'}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default Login
