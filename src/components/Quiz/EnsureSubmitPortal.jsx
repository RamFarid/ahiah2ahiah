import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import PropTypes from 'prop-types'
function EnsureSubmitPortal({ open, remainsQuestions, onClose, onSubmit }) {
  return (
    <Dialog open={open} sx={{ direction: 'rtl' }} onClose={onClose}>
      <DialogTitle color={'error'}>يوجد اسالة بدون اجابة</DialogTitle>
      <DialogContent>
        <DialogContentText>
          يوجد {remainsQuestions} أسالة لم تقم بحلها. هل ترغب في إرسال الاجابات
          بالوضع الحالي؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='inherit' onClick={onClose}>
          إلغاء
        </Button>
        <Button color='primary' onClick={onSubmit}>
          إرسال
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EnsureSubmitPortal.propTypes = {
  open: PropTypes.bool,
  remainsQuestions: PropTypes.number,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default EnsureSubmitPortal
