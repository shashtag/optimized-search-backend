import app from "./app";
// import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000;

// mongoose
//   .connect(process.env.DB_URI as string)
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
