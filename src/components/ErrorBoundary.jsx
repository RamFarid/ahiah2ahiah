import { Typography } from '@mui/material'
import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('From derivied', error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('error.message: ', error.message)
    console.log('errorInfo.componentStack: ', errorInfo.componentStack)
    this.setState((pre) => ({
      ...pre,
      error: error.message,
      errorInfo: errorInfo.componentStack,
    }))
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <Typography color='error' variant='h4' component='h2' align='center'>
            خطأ
          </Typography>
          <Typography align='center'>
            مش وحش أن يطلع اخطأء في البرنامج بتاعك 👀
          </Typography>
          <Typography align='center'>الوحش أن متهاندلش الخطأ ده</Typography>
          <Typography align='center'>
            حاول تجرب تاني و لو فضلت المشكله تعلالي
          </Typography>
          <Typography align='left'>
            {JSON.stringify(this.state.error)}
          </Typography>
          <Typography align='left'>
            {JSON.stringify(this.state.errorInfo)}
          </Typography>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
