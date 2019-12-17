import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const Schema = mongoose.Schema;

export const StudentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: ['matricNumber'],
    trim: true,
  },
  matricNumber: {
    type: String,
    trim: true,
    unique: true,

  },
  results: [{
    session: {
      sessionName: {
        type: String,
      },
      semester: {
        semesterName: {
          type: String,
          enum: ['1st', '2nd'],
          default: '1st',
        },
        grades: [
          {
            course: {
              type: String,
            },
            creditLoad: {
              type: String,
            },
            grade: {
              type: String,
            },
          },
        ],
        repeatCourses: [{
          type: String,
        }],
        coursesFailed: [{
          type: String,
        }],
        SemesterGPA: {
          type: Number,
        },
      },
      SessionGPA: {
        type: Number,
      },
    },
  }],
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

export const StudentModel = mongoose.model('Student', StudentSchema);