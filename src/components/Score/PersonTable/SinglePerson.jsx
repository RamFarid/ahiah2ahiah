import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TableCell,
  TableRow,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import ActionsCell from '../ActionsCell'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useScore } from '../../../Contexts/ScoreContext'
import { useUser } from '../../../Contexts/UserContext'
import SuperscriptIcon from '@mui/icons-material/Superscript'
import generateQRImg from '../../../utils/generateQRImg'
import html2canvas from 'html2canvas'
import PropTypes from 'prop-types'
import server from '../../../lib/axios'

function SinglePerson({ person, onEdit, i }) {
  const [isLoading, setIsLoading] = useState(false)
  const { online, isLoggedIn } = useUser()
  const { removePerson, updatePerson } = useScore()
  const qrCodeImageRef = useRef(null)
  const [qrCode, setQrCode] = useState({
    isQRCode: false,
    qrCodeImage: '',
    qrCodeDowmload: '',
  })
  const theme = useTheme()

  const deleteHandler = useCallback(async () => {
    if (!online) return toast('طب ما انت معكش نت')
    try {
      setIsLoading(true)
      const res = await server.delete(`/persons/${person._id}`)
      const data = res.data
      if (data.success) {
        toast.success(data.message)
        removePerson(person)
        return
      }
      toast.error(data.message)
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [online, person, removePerson])

  const quickScoreUpHandler = useCallback(async () => {
    const res = await server.put(`/qrcode?id=${person._id}`)
    const data = res.data
    if (data.success) {
      toast.success(`${person.name} زاد ${data.inc_by}`, {
        progress: 0,
        icon: <SuperscriptIcon color='success' />,
      })
      updatePerson(data.data)
    }
  }, [person, updatePerson])

  // #E6E6FA
  // #FFDAB9
  // #BEBAA7
  return (
    <>
      <TableRow
        sx={{
          bgcolor: 'transparent',
        }}
      >
        <CustomCell align='right'>{i || '107'}</CustomCell>
        <CustomCell
          align='right'
          onClick={async () => {
            if (!isLoggedIn) return
            try {
              setIsLoading(true)
              const link = await generateQRImg(person._id)
              setQrCode((pre) => ({
                ...pre,
                isQRCode: true,
                qrCodeImage: link,
              }))
              setTimeout(async () => {
                const divToCapture = qrCodeImageRef.current
                const canvas = await html2canvas(divToCapture, {
                  backgroundColor: theme.palette.background.default,
                })
                const screenshotUrl = canvas.toDataURL('image/png')
                setQrCode((pre) => ({
                  ...pre,
                  qrCodeDowmload: screenshotUrl,
                }))
                setIsLoading(false)
              }, 200)
              // Use html2canvas to take the screenshot
            } catch (error) {
              console.log(error)
            }
          }}
        >
          {person.name}
        </CustomCell>
        <CustomCell align='center'>
          {person.grade === 1 ? 'اولى' : person.grade === 2 ? 'تانيه' : 'تالته'}
        </CustomCell>
        <CustomCell
          align='center'
          sx={{
            bgcolor: isLoggedIn ? 'action.hover' : 'transparent',
          }}
        >
          {person.points}
        </CustomCell>
        {isLoggedIn && (
          <ActionsCell
            onEdit={() => onEdit(person)}
            onDelete={deleteHandler}
            isLoading={isLoading}
            onHold={quickScoreUpHandler}
          />
        )}
      </TableRow>
      <Dialog
        open={qrCode.isQRCode}
        onClose={() =>
          setQrCode({ isQRCode: false, qrCodeDowmload: '', qrCodeImage: '' })
        }
      >
        <DialogTitle>QR code</DialogTitle>
        <DialogContent>
          <Stack ref={qrCodeImageRef} pb={0.7} borderRadius={'10px'}>
            <Box
              component={'img'}
              src={qrCode.qrCodeImage}
              alt='Photo of user'
              maxWidth={'300px'}
              maxHeight={'300px'}
              overflow={'hidden'}
              mx={'auto'}
              position={'relative'}
              zIndex={2}
            />
            <Typography align='center' variant='h5'>
              {person.name}
            </Typography>
          </Stack>
          <Button
            fullWidth
            disabled={isLoading}
            sx={{ mt: 3 }}
            component={'a'}
            href={qrCode.qrCodeDowmload}
            variant='contained'
            download={`${person.name}-qrcode.png`}
          >
            {isLoading ? 'بحمل الqrcode...' : 'نزل الصورة'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

const CustomCell = styled(TableCell)({
  paddingBlock: '8px',
})

SinglePerson.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    points: PropTypes.number,
    grade: PropTypes.number,
  }),
  onEdit: PropTypes.func,
  i: PropTypes.number,
}

export default SinglePerson
