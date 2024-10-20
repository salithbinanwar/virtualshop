import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Encrypt password using bcrypt
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//comparing the password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  // console.log(enteredPassword, this.adminPassword)
  return await bcrypt.compare(enteredPassword, this.password)
}

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
