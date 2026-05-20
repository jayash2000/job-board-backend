import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';
import { logger } from './utils/logger';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(
  pinoHttp({
    logger,
  }),
);

// routes

app.use(errorMiddleware);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server running smoothly',
  });
});

export default app;
