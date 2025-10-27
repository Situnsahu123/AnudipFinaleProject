const express = require("express");
const app = express();
const cors = require("cors");
const { db, DBconnection } = require("./db/database")
const UserTable = require("./models/LoginModel");
const SignupRoute = require("./routes/SignupRoute");
const LoginRoute = require("./routes/LoginRoute");
const { verifyToken } = require("./services/JwtAuth");
const ChatRoute = require("./routes/ChatRoute")
const BlockRoute = require("./routes/BlockRoute");

app.use(cors());
app.use(express.urlencoded({ extended: true }));  
app.use(express.json());
UserTable();


app.use(SignupRoute);
app.use(LoginRoute);
app.use(ChatRoute);
app.use("/block",BlockRoute);

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use("/admin",verifyToken);

const POST = 4000;
app.listen(POST, async () => {
  console.log(`server is runing on http://localhost:${POST}`);
  try {
    await db.DBconnection();
    console.log("👍 connection establish");
  } catch (error) {
    console.log("unable to connect");
  }
});
