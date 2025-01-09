import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import NotFound from './app/middlewares/notFound';
import router from './app/router';
const app = express();
import cookieParser from 'cookie-parser';

//parsers
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));


// application routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to the server 5000',
  });
});

// Global error handling
app.use(globalErrorHandler);

app.use(NotFound);

export default app;
