import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

function NavigationCard({ to, title, icon, color }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      sx={(t) => ({
        textAlign: 'center',
        color: t.palette.text.primary,
        textDecorationColor: 'transparent',
      })}
    >
      <Stack
        width={'120px'}
        height={'120px'}
        bgcolor={'rgba(255, 255, 255, 15%)'}
        sx={{ backdropFilter: 'blur(2px)' }}
        borderRadius={'50%'}
        border={(t) => 'dashed 1px ' + t.palette.text.primary}
        justifyContent={'center'}
        alignItems={'center'}
        boxShadow={
          '0px 5px 5px -3px rgba(255,255,255,0.2), 0px 8px 10px 1px rgba(255,255,255,0.14), 0px 3px 14px 2px rgba(255,255,255,0.12)'
        }
      >
        {icon &&
          React.cloneElement(icon, {
            fontSize: 'large',
            sx: { width: '70%', height: '70%' },
            color: color || 'primary',
          })}
      </Stack>
      <Typography variant='h6' color={'text.secondary'}>
        {title}
      </Typography>
    </Link>
  )
}

NavigationCard.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string,
}

export default NavigationCard
