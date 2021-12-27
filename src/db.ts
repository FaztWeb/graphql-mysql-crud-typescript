import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } from "./config";

export const connectDB = async () => {
  await createConnection({
    type: "mysql",
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    // logging: true,
    synchronize: true,
    entities: [Users],
    ssl: true,
  });
};
