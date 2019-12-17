import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    slug: ['firstName', 'lastName'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please enter your email address',
  },
  userType: {
    type: String,
    enum: ['student', 'courseAdviser', 'admin'],
    default: 'admin',
  },
  password: {
    type: String,
    required: 'You must enter a password',
    trim: true,
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

export const UserModel = mongoose.model('User', UserSchema);