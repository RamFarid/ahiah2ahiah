import {
  BottomNavigationAction,
  BottomNavigation as MuiBottomNavigation,
} from '@mui/material'

function BottomNavigation({ setValue, value }) {
  return (
    <MuiBottomNavigation
      showLabels
      value={value}
      onChange={(_, v) => {
        setValue(v)
      }}
    >
      <BottomNavigationAction>الرئيسية</BottomNavigationAction>
      <BottomNavigationAction>شعار المؤتمر</BottomNavigationAction>
      <BottomNavigationAction>الترتيب</BottomNavigationAction>
    </MuiBottomNavigation>
  )
}

export default BottomNavigation
