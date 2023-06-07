import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dashboard-test-zir6.onrender.com/api',
})

export { api }
