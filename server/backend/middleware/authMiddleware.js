import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../model/adminModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = await Admin.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('not authorized, token failed to be verified')
    }
  } else {
    res.status(401)
    throw new Error('not authorized')
  }
})

export { protect }
