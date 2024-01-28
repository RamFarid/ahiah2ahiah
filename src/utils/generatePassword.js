import { doc, setDoc } from 'firebase/firestore'
import { firestore } from './src/lib/firebase'
const { hashSync } = require('bcrypt')

function generatePassword(password) {
  const hashedPass = hashSync(password, 10)
  setDoc(doc(firestore, 'metadata', 'cred'), {
    password: hashedPass,
  })
}

generatePassword('BenElSamaWElard2023')
