import { model, Model, Schema } from 'mongoose';

export interface IMessage {
  _id: string;
  from: string;
  to: string;
  title: string;
  message: string;
  createdAt: string;
}

export const IMessageSchema = new Schema<IMessage>(
  {
    _id: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { collection: 'messages', timestamps: true }
);

const MessageModel: Model<IMessage> = model('message', IMessageSchema);

export default MessageModel;
