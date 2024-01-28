import { Box, Link as MUILink, Typography } from '@mui/material'
import Paragraph from '../reusable/Paragraph'
import { NavLink } from 'react-router-dom'

function AppContents() {
  return (
    <Box component={'section'}>
      <Typography
        variant='h5'
        component={'h2'}
        display={'flex'}
        alignItems={'center'}
      >
        هتلاقي ايه في البانفلت؟ ❤
      </Typography>
      <Paragraph>
        خش <CustomLink to={'/motto'}>أحفظ الشعار</CustomLink> <br /> ممكن تخش
        تشوف <CustomLink to='/score'>السكور بتاعك أو بتاع مجموعتك</CustomLink>{' '}
        <br /> شوف هتعمل ايه بعد ساعة مثلا او شوف الغدا أمتى <br />
      </Paragraph>
    </Box>
  )
}

const CustomLink = ({ children, to }) => (
  <MUILink component={NavLink} to={to}>
    {children}
  </MUILink>
)

export default AppContents
