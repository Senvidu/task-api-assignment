import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

// Virtual id field to mirror requirement "id"
TaskSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
TaskSchema.set('toJSON', { virtuals: true, versionKey: false, transform: (_doc, ret) => {
  // Hide internal _id
  delete ret._id;
}});

export default mongoose.model('Task', TaskSchema);