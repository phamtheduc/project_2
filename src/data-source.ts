import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./models/user.entity";
import { Product } from "./models/product.entity";
import { Order } from "./models/order.entity";
import { OrderProductMigration1682406577062 } from "./migrations/1682406577062-orderProductMigration";
import { OrderMigration1682406408872 } from "./migrations/1682406408872-orderMigration";
import { ProductMigration1682406404635 } from "./migrations/1682406404635-productMigration";
import { UserMigration1682406398095 } from "./migrations/1682406398095-userMigration";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.ENV === "dev" ? process.env.DB_DATABASE_DEV : process.env.DB_DATABASE_TEST,
  // synchronize: true,
  entities: [User, Product, Order],
  // entities: ["*/models/*.entity.ts"],
  migrationsTableName: "migrations",
  migrations: [
    OrderProductMigration1682406577062,
    OrderMigration1682406408872,
    ProductMigration1682406404635,
    UserMigration1682406398095,
  ],
});

export default AppDataSource;
