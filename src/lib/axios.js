import axios from 'axios'

const server = axios.create({
  baseURL: import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://ahiah2ahiah-server.vercel.app',
})

export default server
