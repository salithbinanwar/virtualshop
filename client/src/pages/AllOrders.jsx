import axiosInstance from '../utils/axios'
import { useEffect } from 'react'

const AllOrders = () => {
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await axiosInstance.get('/orders')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getAllOrders()
  }, [])

  return (
    <div>
      <h1>hello world</h1>
    </div>
  )
}

export default AllOrders
