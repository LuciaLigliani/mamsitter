const express = require('express');
const cors = require('cors');
const announcementRouter = require('./routes/announcementRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const applicationRouter = require('./routes/applicationRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(cors());
app.options('*',cors());

app.use(express.json({ limit: '10kb' }));
app.use('/api/v1/announcements', announcementRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/applications', applicationRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
