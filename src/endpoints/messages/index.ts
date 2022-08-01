import { NextFunction } from 'express';
import { Request, Response } from 'express';
import MessageModel from '../../models/db/message.db';
import { ulid } from 'ulid';

export default {
  getAllMessages: async (req: Request, res: Response) => {
    const { user: to } = req.body;
    const messages = await MessageModel.find({ to });
    const mappedMessages = messages.map(({ _id, from, title, message, createdAt }) => ({
      id: _id,
      from,
      title,
      message,
      date: createdAt,
    }));
    res.send(mappedMessages);
  },
  createMessage: async (req: Request, res: Response) => {
    const { to, title, message, from } = req.body;
    await MessageModel.create({ _id: ulid(), to, title, message, from });
    res.status(200).end();
  },
};
