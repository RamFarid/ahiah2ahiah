import axios from 'axios'

const server = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:5000' : 'else',
})

export default server
