import {
  Link,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import TableHeader from '../TableHeader'
import SingleGroup from './SingleGroup'
import CustomCell from '../../reusable/CustomGroupCell'
import { useCallback, useState } from 'react'
import ControlGroupModal from './ControlGroupModal'
import { useScore } from '../../../Contexts/ScoreContext'
import { useUser } from '../../../Contexts/UserContext'
import TableLoader from '../TableLoader'

function GroupTable() {
  const { groups, isLoading, groupError } = useScore()
  const [showEdit, setShowEdit] = useState(false)
  const [contentEdit, setContentEdit] = useState({})
  const { isLoggedIn } = useUser()
  const editHandler = useCallback((group) => {
    setShowEdit(true)
    setContentEdit(group)
  }, [])
  const closeModalHandler = useCallback(() => {
    setShowEdit(false)
    setContentEdit({})
  }, [])
  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 7 }}>
        <Table>
          <TableHead
            sx={{
              color: '#fff',
            }}
          >
            {groupError?.length > 0 ? (
              <TableRow>
                <CustomCell align='center' sx={{ p: 2 }} colSpan={4}>
                  <Typography
                    component={'div'}
                    variant='caption'
                    color={'error'}
                  >
                    {groupError}
                    <br />
                    لو المشكله فضلت معاك{' '}
                    <Link
                      underline='hover'
                      href='https://api.whatsapp.com/send?phone=201553706448&text=ما هتلاقيني جنبك ديما .. داخللي واتساب ليه؟\n'
                    >
                      تعالالي
                    </Link>
                    <br />
                    {`${
                      groups.length > 0
                        ? 'المجاميع اللي قدامك دي قديمه لحد ما المجامبع الحديثه اوصلها'
                        : ''
                    }`}
                  </Typography>
                </CustomCell>
              </TableRow>
            ) : null}
            <TableHeader
              actionHandler={() => {
                setContentEdit({})
                setShowEdit(true)
              }}
              columns={4}
              actoionText={'ضيف مجموعه'}
              txt='المجــــــامـيـــــع'
            />
            <TableRow>
              <CustomCell>ت</CustomCell>
              <CustomCell align='right'>المجموعه</CustomCell>
              <CustomCell align='right'>النقاط</CustomCell>
              {isLoggedIn && <CustomCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <CustomCell align='center' sx={{ p: 2 }} colSpan={4}>
                  <Typography component={'div'} variant='h6' color={'error'}>
                    <TableLoader />
                  </Typography>
                </CustomCell>
              </TableRow>
            ) : groups.length ? (
              groups.map((group, i) => (
                <SingleGroup
                  onEdit={editHandler}
                  group={group}
                  i={i + 1}
                  key={group._id}
                />
              ))
            ) : (
              <TableRow>
                <CustomCell align='center' sx={{ p: 2 }} colSpan={4}>
                  <Typography component={'div'} variant='h6' color={'error'}>
                    مفيش مجموعات لسه
                  </Typography>
                </CustomCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ControlGroupModal
        open={showEdit}
        onClose={closeModalHandler}
        group={contentEdit}
      />
    </>
  )
}

export default GroupTable
