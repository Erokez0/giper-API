import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config()
export const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.host,
    port: 5432,
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
    connectTimeoutMS: 0
})