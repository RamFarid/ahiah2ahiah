import { Box } from '@mui/material'
import SingleTopCard from './SingleTopCard'
import { useScore } from '../../../Contexts/ScoreContext'

function TopPersons() {
  const { persons } = useScore()
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      mb={2}
      mx='auto'
      gap={2}
      mt={5.625}
    >
      {persons[1] && <SingleTopCard person={persons[1]} i={2} />}
      {persons[0] && <SingleTopCard person={persons[0]} i={1} />}
      {persons[2] && <SingleTopCard person={persons[2]} i={3} />}
    </Box>
  )
}

export default TopPersons
