import { Grid, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import Paragraph from '../components/reusable/Paragraph'

function Motto() {
  // const [showMarrad, setShowMarrad] = useState(
  //   JSON.parse(localStorage.getItem('showMarrad')) || false
  // )
  // const toggleMarrad = () => {
  //   setShowMarrad(!showMarrad)
  //   localStorage.setItem('showMarrad', JSON.stringify(!showMarrad))
  // }
  return (
    <Stack>
      <Typography
        mb={4}
        textAlign={'center'}
        variant='h3'
        component={'h2'}
        sx={{ textDecoration: 'underline' }}
      >
        الــشــعــــار
      </Typography>
      {/* <AudioPlayer /> */}
      {<Marrad />}
      {/* <Button
        onClick={toggleMarrad}
        sx={{
          my: 1,
          position: 'sticky',
          top: `6px`,
          bgcolor: 'background.default',
        }}
        variant='outlined'
      >
        {showMarrad ? 'اخفاء المرد بعد كل فقرة' : 'اظهار المرد بعد كل فقرة'}
      </Button> */}
      <Grid container component={'ul'} px={1} gap={4} mt={2}>
        <CustomListItem
          txt={`ياللي سألتوا فين الله<br/>
     من قبل خلق الاكوان <br/>
    ازلي ابدي ،فين نلقاه؟<br/>
    حال و مالي كل مكان <br/>
    ترف روحه على المياه <br/>
    ضابط الكل فوق الزمان<br/>
    وبحبه خلق لينا حياه<br/>
     رتب ليل ونهار وايام`}
        />
        <CustomListItem
          txt='ياللي سألتوا فين الله  <br/>
وسط شر خطيه حروب <br/>
خلانا احرار نبقي معاه  <br/>
و بارادتنا عملنا  ذنوب  <br/>
انت مخير في الحياه  <br/>
انت حر مفيش مكتوب  <br/>
ربنا نفسه تعيش وياه <br/>
شهوه قلبه انك تتوب'
        />
        <CustomListItem
          txt={`ياللي سألتوا فين الله <br/>
وسط الم ضيق وتجارب <br/>
طب جربت العيشه معاه؟ <br/>
بقوته دوسنا  عقارب <br/>
الموت عنده هو حياه<br/> 
والضيق بيخليك غالب <br/>
     ضابط الكل هو الله <br/>
    هدفه يوصل القارب<br/>`}
        />
      </Grid>
    </Stack>
  )
}

const CustomListItem = ({ txt, showMarrad }) => (
  <>
    <Grid
      item
      component={'li'}
      sx={{
        '&::marker': { content: "'\u{1F9E1}'" },
        paddingInlineStart: 1.3,
      }}
    >
      <Typography
        maxWidth={'calc(370px - 20px)'}
        dangerouslySetInnerHTML={{ __html: txt }}
      />
    </Grid>
    {showMarrad && <Marrad />}
  </>
)

const Marrad = () => (
  <Paragraph component={'p'} fontWeight={700} variant='h6'>
    <Typography fontWeight={'inherit'} component={'span'}>
      المرد:
    </Typography>
    <Typography fontWeight={'inherit'} component={'span'} color={'primary'}>
      {' '}
      اهيه اهيه ولا مكان هو مش فيه اهيه اهيه عايش فينا و نحيا بيه اهيه اهيه خالق
      تفاصيلك بايديه اهيه اهيه كل خليقته تحكي عليه اهيه اهيه صوته علي مجاري
      المياه اهيه اهيه من فمه مخارج الحياه اهيه اهيه الملكوت ... اننا نلقاه اهيه
      اهيه حلوه اوي العيشه معاه
    </Typography>
  </Paragraph>
)

CustomListItem.propTypes = {
  txt: PropTypes.string,
  showMarrad: PropTypes.bool,
}

export default Motto
