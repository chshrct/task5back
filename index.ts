import cors from 'cors';
import express, { Request, Response } from 'express';
import { errorHandler } from './src/error-handler/error-handler';
import { connect } from './src/models/db/mongoose-connection';
import MessageModel from './src/models/db/message.db';
import Auth from './src/endpoints/auth';
import Messages from './src/endpoints/messages';
import Users from './src/endpoints/users';
import { Server } from 'socket.io';
import http from 'http';
import { ChangeStreamInsertDocument } from 'mongodb';
import { IMessage } from './src/models/db/message.db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: '/socket',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use(
  cors({
    origin: '*',
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
connect();

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

app.post('/auth', Auth.signUp);

app.post('/messages', Messages.getAllMessages);
app.get('/users', Users.getAllUserNames);

app.post('/messages/create', Messages.createMessage);

app.use(errorHandler);

io.on('connection', (socket) => {
  socket.on('userName', (user) => {
    const messageChangeStream = MessageModel.watch();
    messageChangeStream.on('change', async (data: ChangeStreamInsertDocument<IMessage>) => {
      if (data.fullDocument.to === user) {
        const message = {
          id: data.fullDocument._id,
          from: data.fullDocument.from,
          title: data.fullDocument.title,
          message: data.fullDocument.message,
          to: data.fullDocument.to,
          date: data.fullDocument.createdAt,
        };
        io.to(socket.id).emit('newMessage', message);
      }
    });
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Application started on port ${port}!`);
});
