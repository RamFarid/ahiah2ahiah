import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded'
import { AccordionSummary, Typography } from '@mui/material'

function MenuTitle({ txt, icon }) {
  return (
    <AccordionSummary
      sx={{
        borderRadius: '100px !important',
        overflow: 'hidden',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
      expandIcon={<ExpandMoreRounded />}
    >
      <Typography
        display={'flex'}
        alignItems={'center'}
        height={'100%'}
        gap={1}
        fontWeight={700}
      >
        {icon}
        {txt}
      </Typography>
    </AccordionSummary>
  )
}

export default MenuTitle
