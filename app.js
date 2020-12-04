const express = require('express');
const announcementRouter = require('./routes/announcementRoutes');

const app = express();

app.use(express.json());
app.use('/api/v1/announcements', announcementRouter);

module.exports = app;
