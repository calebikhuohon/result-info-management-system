import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const Schema = mongoose.Schema;

export const CourseAdviserSchema = new Schema({
  courseAdviser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  staffId: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

export const CourseAdviserModel = mongoose.model('CourseAdviser', CourseAdviserSchema);
