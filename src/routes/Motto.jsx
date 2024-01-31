import { Box, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import Paragraph from '../components/reusable/Paragraph'

function Motto() {
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
      <Stack container component={'ol'} px={1} gap={4} mt={2}>
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
        <Marrad />
        <CustomListItem
          txt='ياللي سألتوا فين الله  <br/>
وسط شر خطيه حروب <br/>
خلانا احرار نبقي معاه  <br/>
و بارادتنا عملنا  ذنوب  <br/>
انت مخير في الحياه  <br/>
انت حر مفيش مكتوب  <br/>
بتقول انه بعيد ف سماه <br/>
 ده عشانك هو مصلوب <br/>'
        />
        <Marrad />
        <CustomListItem
          txt={`ياللي سألتوا فين الله <br/>
وسط الم ضيق وتجارب <br/>
طب جربت العيشه معاه؟ <br/>
بقوته دوسنا  عقارب <br/>
الموت عنده هو حياه<br/> 
والضيق بيخليك غالب <br/>
     ضابط الكل هو الله <br/>
    اطلبه عنك هيحارب <br/>`}
        />
        <Marrad />
      </Stack>
    </Stack>
  )
}

const CustomListItem = ({ txt }) => (
  <>
    <Box
      component={'p'}
      textAlign={'center'}
      sx={{
        paddingInlineStart: 1.3,
      }}
    >
      <Typography
        maxWidth={'calc(370px - 20px)'}
        dangerouslySetInnerHTML={{ __html: txt }}
      />
    </Box>
  </>
)

const Marrad = () => (
  <Paragraph
    component={'p'}
    fontWeight={700}
    variant='h6'
    color={'primary'}
    fontSize={'inherit'}
    align='center'
  >
    اهيه اهيه ولا مكان هو مش فيه <br />
    اهيه اهيه عايش فينا و نحيا بيه <br />
    اهيه اهيه خالق تفاصيلك بايديه <br />
    اهيه اهيه كل خليقته تحكي عليه <br />
    <br />
    اهيه اهيه من فمه مخارج الحياه <br />
    اهيه اهيه الملكوت ... اننا نلقاه
    <br />
    اهيه اهيه حلوه اوي العيشه معاه <br />
    اهيه اهيه خلي عينك ديما شايفاه
  </Paragraph>
)

CustomListItem.propTypes = {
  txt: PropTypes.string,
  showMarrad: PropTypes.bool,
}

export default Motto
