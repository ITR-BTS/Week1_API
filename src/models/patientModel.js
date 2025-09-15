import mongoose from 'mongoose'
import './physicianModel.js'

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City cannot exceed 50 characters']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
    maxlength: [50, 'State cannot exceed 50 characters']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [50, 'Country cannot exceed 50 characters']
  }
}, { _id: false })

const patientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, 
    trim: true, //bỏ space thừa 
    lowercase: true, //chuyển thành chữ thường
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
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
        return date <= today && date >= new Date('1900-01-01')
      },
      message: 'Date of birth must be a valid date and not in the future'
    }
  },
  physician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Physician',
    required: null,
    // required: [true, 'Physician assignment is required'],
    validate: {
      validator: async function (physicianId) {
        const Physician = mongoose.model('Physician')
        const physician = await Physician.findById(physicianId)
        return !!physician
      },
      message: 'Assigned physician does not exist'
    }
  },
  addressInfo: {
    type: addressSchema,
    required: [true, 'Address information is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true
})

const patientModel = mongoose.model('Patient', patientSchema)
export default patientModel
