import mongooose from 'mongoose';

const Schema = mongooose.Schema;

const TokenSchema = new Schema({
  user: {
    type: mongooose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200 * 2, /*12 hours * 2 = 24 hours */
  },
});

export const VerificationTokenModel = mongooose.model('VerificationToken', TokenSchema);