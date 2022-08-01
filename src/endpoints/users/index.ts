import { NextFunction } from 'express';
import { Request, Response } from 'express';
import UserModel from '../../models/db/user.db';

export default {
  getAllUserNames: async (req: Request, res: Response) => {
    const users = await UserModel.find({});
    const userNames = users.reduce((acc, user) => {
      acc.push(user.name);
      return acc;
    }, []);
    res.send(userNames);
  },
};
