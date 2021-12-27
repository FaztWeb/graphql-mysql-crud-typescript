import app from "./app";
import { connectDB } from "./db";

const main = async () => {
  try {
    await connectDB();
    app.listen(3000);
    console.log("Server on port", 3000);
  } catch (error) {
    console.error(error);
  }
};

main();
