import { Avatar, Box, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'

function AppUsage() {
  return (
    <Box component={'section'}>
      <Typography
        variant='h5'
        component={'h2'}
        display={'flex'}
        alignItems={'center'}
      >
        ازاي تسخدمه؟ <InsertEmoticonIcon />
      </Typography>
      <Typography variant='caption' color='text.secondary' component={'span'}>
        اسهل من الfast food
      </Typography>
      <Box component={'ul'} px={2}>
        <Typography
          component={'li'}
          position={'relative'}
          width={'fit-content'}
        >
          افتح القايمه من العلامه اللي فوق دي{' '}
          <Avatar
            component={'span'}
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: '-20px',
              width: '18px',
              height: '18px',
              display: 'inline-block',
            }}
          >
            <MenuIcon sx={{ width: '18px', height: '18px' }} />
          </Avatar>
        </Typography>
        <Typography component={'li'}>اختار اللي عايز تعرفه</Typography>
      </Box>
      <Typography component={'span'}>
        بس كده ادخل شوف اللي عايز تعرفه
      </Typography>

      <Typography mt={2.4} component={'div'} fontWeight={700}>
        ايه الزائد اللي تحت دي؟
      </Typography>
      <Box component={'ul'} px={2}>
        <Box component={'li'}>تشير منها الأبلكاشن لصاحبك</Box>
        <Box component={'li'}>
          تشير منها الصفحه اللي انت فيها لو ترنيمه أو محفوظه او صفحه البونص
          الخ...
        </Box>
      </Box>
    </Box>
  )
}

export default AppUsage
