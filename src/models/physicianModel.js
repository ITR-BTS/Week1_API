import mongoose from 'mongoose'

const physicianSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: 'Gender must be either Male or Female'
    },
    required: [true, 'Gender is required']
  },
  dob: {
    type: String,
    required: [true, 'Date of birth is required'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format'],
    validate: {
      validator: function (value) {
        const date = new Date(value)
        const today = new Date()
        const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
        return date <= minAge && date >= new Date('1940-01-01')
      },
      message: 'Physician must be at least 18 years old'
    }
  }
}, {
  timestamps: true
})
const physicianModel = mongoose.model('Physician', physicianSchema)
export default physicianModel
