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
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';
import companyRoutes from './modules/companies/companies.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/companies', companyRoutes);

app.use(errorMiddleware);

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Server running smoothly',
  });
});

export default app;
