require('dotenv/config');
require('./db');
const express = require('express');

const { isAuthenticated } = require('./middleware/jwt.middleware');
const allRoutes = require('./routes');
const authRouter = require('./routes/auth.routes');
const protectedRoute = require('./routes/protected.routes');
const meetingRoutes = require('./routes/meeting.routes');

const app = express();

require('./config')(app);

app.use('/api', allRoutes);
app.use('/api/protected', isAuthenticated, protectedRoute);
app.use('/api/meetings', isAuthenticated, meetingRoutes);
app.use('/auth', authRouter);

require('./error-handling')(app);

module.exports = app;
