import axios from 'axios'
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api/users',
  baseURL: 'https://virtualshop-onlyserver.onrender.com/api/users',
  withCredentials: true,
})
export default axiosInstance
