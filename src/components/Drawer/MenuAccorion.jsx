import { Accordion } from '@mui/material'

function MenuAccorion({ isOpen, setIsOpen = () => {}, children, i }) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      square
      sx={(theme) => ({
        overflow: 'hidden',
        my: '8px !important',
        transition: 'all .4s ease',
        borderRadius: '33px',
        ml: isOpen ? 2 : 0,
        backgroundColor: isOpen ? 'background' : 'transparent',
        '& *': {
          color:
            isOpen && theme.palette.mode === 'light'
              ? '#000 !important'
              : isOpen && theme.palette.mode === 'dark'
              ? '#fff'
              : 'text.primary !important',
        },
      })}
      expanded={isOpen}
      onChange={(_e, expanded) => setIsOpen(expanded ? i : null)}
    >
      {children}
    </Accordion>
  )
}

export default MenuAccorion
