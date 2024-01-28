import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItem as MuiMenuItem } from '@mui/material'
function MenuItem({ txt, onClick = () => {}, link, disable }) {
  return (
    <MuiMenuItem
      component={NavLink}
      to={link}
      disabled={Boolean(disable)}
      onClick={onClick}
      sx={(theme) => ({
        '&.active': {
          backgroundColor: `${theme.palette.action.focus} !important`,
        },
      })}
    >
      {txt}
    </MuiMenuItem>
  )
}

export default MenuItem
