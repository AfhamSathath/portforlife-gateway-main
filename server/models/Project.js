import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or base64
  },
  tags: {
    type: [String],
    default: [],
  },
  liveUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
