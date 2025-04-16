import mongoose from 'mongoose'
import slugify from 'slugify'

const memberSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: false,
      trim: true
    },
    memberImage: {
      type: String,
      required: false
    },
    slug: { type: String, unique: true },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    description: { type: String }
  },
  { timestamps: true }
)

memberSchema.pre('validate', function (next) {
  if (this.memberName) {
    this.slug = slugify(this.memberName, { lower: true, strict: true })
  }
  next()
})

export default mongoose.model('Member', memberSchema)
