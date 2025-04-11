import SuperAdmin from '../models/superAdmin.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// 📌 Register Super Admin
export const registerSuperAdmin = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      })
    }

    const existingAdmin = await SuperAdmin.findOne({ username })
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Super Admin already exists'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newAdmin = await SuperAdmin.create({
      username,
      password: hashedPassword
    })

    res.status(201).json({
      success: true,
      message: 'Super Admin registered successfully',
      data: newAdmin,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// 📌 Login Super Admin
export const loginSuperAdmin = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      })
    }

    const admin = await SuperAdmin.findOne({ username })
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Super Admin not found'
      })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: `Bearer ${token}`
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// 📌 Get Super Admin Details
export const getSuperAdmin = async (req, res) => {
  try {
    const admin = await SuperAdmin.findById(req.params.id).select('-password')
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Super Admin not found'
      })
    }

    res.status(200).json({
      success: true,
      data: admin
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// 📌 Update Super Admin
export const updateSuperAdmin = async (req, res) => {
  try {
    const { username, password } = req.body
    let updateData = { username }

    if (password) {
      const salt = await bcrypt.genSalt(10)
      updateData.password = await bcrypt.hash(password, salt)
    }

    const updatedAdmin = await SuperAdmin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password')

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Super Admin not found'
      })
    }

    res.status(200).json({
      success: true,
      data: updatedAdmin
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// 📌 Delete Super Admin
export const deleteSuperAdmin = async (req, res) => {
  try {
    const deletedAdmin = await SuperAdmin.findByIdAndDelete(req.params.id)
    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Super Admin not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Super Admin deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
