import { config } from "dotenv";
import { DataSource } from "typeorm";
config();

const connectionPool = new DataSource({
  type: "postgres",
  // url:"postgres://mentorguser:Iqo77AoFAMGA3RP4wIKi8ndEZJ3KcDtd@dpg-cii4itaip7vpelq30df0-a.oregon-postgres.render.com/mentorg",
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  entities: ["src/entity/*.ts"],
  ssl: process.env.DB_USERNAME === "mentorguser" ? true : false,
});

connectionPool
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
export default connectionPool;
