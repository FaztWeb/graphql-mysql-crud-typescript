import app from "./app";
import { connectDB } from "./db";
import {PORT} from './config'

const main = async () => {
  try {
    await connectDB();
    app.listen(PORT);
    console.log("Server on port", PORT);
  } catch (error) {
    console.error(error);
  }
};

main();
