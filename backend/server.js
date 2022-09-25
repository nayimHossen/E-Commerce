const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/mongoConnection");

//config
dotenv.config({ path: "backend/config/config.env" });

//database connect
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
