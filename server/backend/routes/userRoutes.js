import express from 'express'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

import {
  authUser,
  getOrders,
  getUserProfile,
  logoutUser,
  registerUser,
  sendOrders,
  updateUserProfile,
} from '../controllers/userController.js'

// router.post('/admin/register', registerUser)
// router.post('/admin/auth', authUser)
// router.post('/admin/logout', protect, logoutUser)
// router.route('/profile').get(getUserProfile).put(updateUserProfile)
//.delete(protect, deleteUser)

//admin routes
router.route('/admin/register').post(registerUser)
router.route('/admin/auth').post(authUser)
router.route('/admin/logout').post(protect, logoutUser)
router
  .route('/admin/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

//orders route
router.route('/orders').post(sendOrders).get(protect, getOrders)

export default router
