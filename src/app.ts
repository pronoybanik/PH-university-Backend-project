import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
const app = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/user', UserRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the server 5000',
  });
});

app.use(globalErrorHandler);

export default app;
