require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");
const allRoutes = require("./routes");
const authRouter = require("./routes/auth.routes");
const protectedRoute = require("./routes/protected.routes");
const meetingRoutes = require("./routes/meeting.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();

require("./config")(app);

app.use("/api", allRoutes);
app.use("/api/protected", isAuthenticated, protectedRoute);
app.use("/auth", authRouter);
app.use("/meetings", meetingRoutes);
app.use("/profile", profileRoutes);

require("./error-handling")(app);

module.exports = app;
