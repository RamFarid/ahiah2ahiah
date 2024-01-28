import { AccordionDetails } from '@mui/material'

function MenuAccordionDetails({ children }) {
  return (
    <AccordionDetails
      sx={{
        '& > *': {
          borderRadius: '100px',
        },
      }}
    >
      {children}
    </AccordionDetails>
  )
}

export default MenuAccordionDetails
