import asyncHandler from 'express-async-handler'
import Admin from '../model/adminModel.js'
import Order from '../model/orderModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/admin/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const admin = await Admin.findOne({ email })
  const isMatchPassword = await admin.matchPassword(password)
  if (admin && isMatchPassword) {
    const jwt = generateToken(res, admin._id)

    res.cookie('jwt', jwt, {
      //   httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    res.json({
      isSuccess: true,
      _id: admin._id,
      name: admin.adminName,
      jwt,
    })
  } else {
    res.status(404)
    throw new Error('invalid admin or password')
  }
})

//@desc    Register admin
//@route   POST /api/users/admin/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const adminSingularity = await Admin.countDocuments()

  if (adminSingularity >= 1) {
    res.status(400)
    throw new Error('1 Admin already exists')
  }

  const userExists = await Admin.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  })

  if (admin) {
    const jwt = generateToken(res, admin._id)

    res.cookie('jwt', jwt, {
      //   httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      jwt,
    })
  } else {
    res.status(400)
    throw new Error('Registration failed')
  }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'admin logged out successfully' })
}

//@ getting the order
// @route get /api/users/getorders
// @access public
const sendOrders = asyncHandler(async (req, res) => {
  const { name, email, orderType } = req.body
  const order = await Order.create({
    name,
    email,
    orderType,
  })

  if (order) {
    res.status(201).json({
      _id: order._id,
      name: order.name,
      email: order.email,
      orderType: order.orderType,
    })
  } else {
    res.status(400)
    throw new Error('Invalid order data')
  }
})

// @desc gettig all orders
// @route get /api/users/getorders
// @access public
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
  res.json({ data: orders })
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.find({})
  res.json({ data: admin })
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {})

export {
  authUser,
  getOrders,
  getUserProfile,
  logoutUser,
  registerUser,
  sendOrders,
  updateUserProfile,
}
