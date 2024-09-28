const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require('./routes/userRoute');
const adminRoutes = require("./routes/adminRoute");
const doctorRoutes = require("./routes/doctorRoute");
const connectDb = require("./config/connectDb");
const path = require("path");

// dotenv config
dotenv.config();
connectDb();

// rest object
const app = express();

// CORS options
const corsOptions = {
  origin: '*', // Allow all origins, change for production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// middlewares
app.use(cors(corsOptions)); // Use CORS before routes
app.options('*', cors(corsOptions)); // Preflight requests for all routes
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);

// static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// port
const PORT = process.env.PORT || 8080;

// listen port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
