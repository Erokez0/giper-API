import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "giperuser",
    password: "giperpass",
    database: "giperdb",
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
    connectTimeoutMS: 0
})