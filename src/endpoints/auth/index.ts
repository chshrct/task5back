import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { ulid } from 'ulid';
import UserModel, { IUser } from '../../models/db/user.db';

export default {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const userExists = await UserModel.findOne({ name: user });
    if (!userExists) {
      const newUser: IUser = {
        _id: ulid(),
        name: user,
      };
      await UserModel.create(newUser);
    }

    res.status(200).end();
  },
};
