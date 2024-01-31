import { Navigate } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'
import GroupTable from '../components/Score/GroupTable/GroupTable'
import PersonTable from '../components/Score/PersonTable/PersonTable'
import TopPersons from '../components/Score/TopPersons/TopPersons'

function Score() {
  const { isLoggedIn } = useUser()
  if (!isLoggedIn) return <Navigate to='/' replace />
  return (
    <>
      <TopPersons />
      <GroupTable />
      <PersonTable />
    </>
  )
}

export default Score
