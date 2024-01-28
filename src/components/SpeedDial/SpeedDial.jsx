import {
  Backdrop,
  SpeedDial as MuiSpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import OfflineShareIcon from '@mui/icons-material/OfflineShare'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

function SpeedDial() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { day } = useParams()

  const shareApp = async (current) => {
    try {
      if (navigator.share) {
        let data = {
          title: 'مؤتمر "أحيا 2 Ahia"',
          text: 'دليلك  في مؤتمر "أحيا 2 Ahia" للمرحله الثانويه خدمة ثانوي كنيسة العذراء مريم بالمعادي .. معمول بالـ❤ رام فريد',
          url: 'https://ben-elsama-w-elard-2023.vercel.app',
        }
        if (current) {
          data.url = window.location.href
          if (window.location.pathname === '/score')
            data.text = `بص كده على الترتيب 
          - ترتيب المجاميع
          - ترتيبك أنت
          تقدر تشوف مكانك فين في المؤتمر .. متنساش الجوايز هتعجبك ⚡
          `

          if (window.location.pathname === '/motto')
            data.text = `أسمع أقرا احفظ الشعار .. خد بونص ليك و لمجموعتك 🤞`
          if (day) data.text = `أعرف عندنا برنامج يوم ال${day}`
        }
        await navigator.share(data)
      } else {
        let data = `مؤتمر "أحيا 2 Ahia"
          دليلك  في مؤتمر "أحيا 2 Ahia" للمرحله الثانويه خدمة ثانوي كنيسة العذراء مريم بالمعادي .. معمول بالـ❤ رام فريد 
        `
        if (current) {
          if (window.location.pathname === '/score')
            data = `بص كده على الترتيب 
          - ترتيب المجاميع
          - ترتيبك أنت
          تقدر تشوف مكانك فين في المؤتمر .. متنساش الجوايز هتعجبك ⚡
          ${window.location.href}
          `
          if (window.location.pathname === '/motto')
            data = `أسمع أقرا احفظ الشعار .. خد بونص ليك و لمجموعتك 🤞 ${window.location.href}`
          if (day)
            data = `أعرف عندنا برنامج يوم ال${day} ${window.location.href}`
        }
        await navigator.clipboard.writeText(data)
        toast('نسخت الموقع', {
          progress: 0,
          autoClose: 2000,
        })
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Backdrop open={open} />
      <MuiSpeedDial
        ariaLabel='SpeedDial tooltip example'
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={<OfflineShareIcon />}
          tooltipTitle={'شير للأبليكاشن'}
          tooltipOpen
          onClick={shareApp}
        />
        <SpeedDialAction
          icon={<ShareIcon />}
          props={{
            sx: {
              bgcolor: 'red',
            },
          }}
          tooltipTitle={'شير الصفحه الحاليه'}
          tooltipOpen
          onClick={() => shareApp(true)}
        />
      </MuiSpeedDial>
    </>
  )
}

export default SpeedDial
