import { model, Model, Schema } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
}

const IUserSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, index: true, unique: true },
  },
  { collection: 'users', timestamps: true }
);

const UserModel: Model<IUser> = model('user', IUserSchema);

export default UserModel;
