const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { mongoConnect } = require("./util/database");
const arthingRouts = require("./routes/arthingRouts");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { apiCounter } = require("./middleware/apiCounter");
const { swaggerOptions } = require("./util/swagger");

const specs = swaggerJsDoc(swaggerOptions);

const app = express();

// swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELET, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/** api inspector */
app.use((req, res, next) => {
  apiCounter(req, res, next);
});

// rooutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/arthing", arthingRouts);

// error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

// Establishing the port
const PORT = process.env.PORT || 8080;

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`starting server at ${PORT}`);
  });
});
