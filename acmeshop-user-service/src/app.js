const express = require("express");
const cors = require("cors");

const userRoutes =
require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(
  "/api/v1/users",
  userRoutes
);

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
  });
});

app.listen(3000, () => {
  console.log(
    "User Service running on port 3000"
  );
});