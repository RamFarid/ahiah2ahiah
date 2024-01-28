import { Box, Typography } from '@mui/material'
import Paragraph from '../reusable/Paragraph'

function AppReason() {
  return (
    <Box component={'section'}>
      <Typography variant='h5' component={'h2'}>
        ليه؟ 😉
      </Typography>
      <Paragraph>
        حبينا نعملك حاجه جديده تحببك فينا و في المؤتمر و نخليها حاجه تفاعليه و
        تحبها فعملنالكم البانفلت على شكل برنامج تفاعلي تحب تستخدمه و تتعامل معاه
        ✨
      </Paragraph>
      <Paragraph>
        البرنامج فيه كل حاجه زي البانفلت العادي بس بتجربه تحبها و تحب تتعامل
        معاه
      </Paragraph>
    </Box>
  )
}

export default AppReason
