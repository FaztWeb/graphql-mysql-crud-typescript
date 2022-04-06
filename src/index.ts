import app from "./app";
import { AppDataSource } from "./db";
import { PORT } from "./config";

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized')
    app.listen(PORT);
    console.log(`Server on http://localhost:${PORT}/graphql`);
  } catch (error) {
    console.error(error);
  }
};

main();
