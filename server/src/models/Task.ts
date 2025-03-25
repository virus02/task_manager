import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  catergory?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed?: boolean;
}

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

export default mongoose.model<ITask>('Task', TaskSchema);