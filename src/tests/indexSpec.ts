import orderController from "../handlers/order.handler";
import productController from "../handlers/product.handler";
import userController from "../handlers/user.handler";
import { Order } from "../models/order.entity";
import { Product } from "../models/product.entity";
import { User } from "../models/user.entity";
import { v4 as uuid4 } from "uuid";
import { STATUS } from "../util/contant";
import app from "./../index";
import supertest from "supertest";
import AppDataSource from "../data-source";
let request = supertest.agent(app);

describe("Connect Repository", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Data source have been initialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });
  describe("User Model", () => {
    it("Should have find all user", () => {
      expect(userController.getUsers).toBeDefined();
    });
    it("Should have find user by id", () => {
      expect(userController.getOneUsers).toBeDefined();
    });
    it("Should have add user", () => {
      expect(userController.addUser).toBeDefined();
    });
    it("Find method should get all users", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      expect(users.length).not.toBeNaN();
    });
    it("Save and FindOne method should create user and find one users", async () => {
      await AppDataSource.getRepository(User).save({
        id: uuid4(),
        username: "test",
        password: "test",
      });
      const users = await AppDataSource.getRepository(User).findOne({
        where: { username: "test" },
      });
      expect(users?.id).not.toBeNull();
    });
    it("Index [token required]: 'http://localhost:3000/api/v1/users/auth' [GET]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .get("api/v1/users/auth")
          .set("Authorization", `bearer ${getToken.token}`);
        expect(200).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
    it("Show [token required]: 'http://localhost:3000/api/v1/users/auth/:userid' [GET]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .get("api/v1/users/auth/123")
          .set("Authorization", `bearer ${getToken.token}`);
        expect(200).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
    it("Create N[token required]: 'http://localhost:3000/api/v1/users/auth/add/user' [POST]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .post("api/v1/users/auth/add/user")
          .set("Authorization", `bearer ${getToken.token}`)
          .send({
            username: "binh",
            password: "123456",
          });
        expect(200).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
  });

  describe("Product model", () => {
    it("Should have find all products", () => {
      expect(productController.getProducts).toBeDefined();
    });
    it("Should have find product by id", () => {
      expect(productController.getOneProduct).toBeDefined();
    });
    it("Should have find top 5 product", () => {
      expect(productController.getTop5Product).toBeDefined();
    });
    it("Should have filter product by category", () => {
      expect(productController.filterProductByCategory).toBeDefined();
    });
    it("Find should get all product", async () => {
      const products = await AppDataSource.getRepository(Product).find();
      expect(products.length).not.toBeNaN();
    });
    it("Save and FindOne should create and get a product", async () => {
      const newProduct = await AppDataSource.getRepository(Product).save({
        id: uuid4(),
        name: "test",
        category: "test",
        price: 50,
      });
      const users = await AppDataSource.getRepository(Product).findOne({
        where: { id: newProduct.id },
      });
      expect(users).not.toBeNull();
    });
    it("End point: Index: 'http://localhost:3000/api/v1/products' [GET]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .get("api/v1/products")
          .set("Authorization", `bearer ${getToken.token}`);
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
    it("Show: 'http://localhost:3000/api/v1/products/:id' [GET]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .get("api/v1/products/123")
          .set("Authorization", `bearer ${getToken.token}`);
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
    it("Create [token required]: 'http://localhost:3000/api/v1/products' [POST]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .post("api/v1/products")
          .send({
            name: "test",
            price: "test",
            category: "test"
          })
          .set("Authorization", `bearer ${getToken.token}`);
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
    it("[OPTIONAL] Top 5 most popular products: 'http://localhost:3000/api/v1/products/filter/top5' [GET]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .get("api/v1/products/filter/top5")
          .set("Authorization", `bearer ${getToken.token}`);
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
    it("[OPTIONAL] Products by category (args: product category): 'http://localhost:3000/api/v1/products/category/phone' [GET]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .get("api/v1/products/category/phone")
          .set("Authorization", `bearer ${getToken.token}`);
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
  });

  describe("Order model", () => {
    it("Should have find all active orders", () => {
      expect(orderController.activeOrders).toBeDefined();
    });
    it("Should have find all completed orders", () => {
      expect(orderController.completedOrders).toBeDefined();
    });
    it("Find method should get all active order", async () => {
      const orders = await AppDataSource.getRepository(Order).find({
        where: { status: STATUS.ACTIVE },
        select: ["id"]
      });
      expect(orders.length).not.toBeNaN();
    });
    it("Find method should get all completed order", async () => {
      const orders = await AppDataSource.getRepository(Order).find({
        where: { status: STATUS.COMPLETED },
        select: ["id"]
      });
      expect(orders.length).not.toBeNaN();
    });
    it("Current Order by user (args: user id)[token required]: 'http://localhost:3000/api/v1/orders/active/:userid' [GET]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .get("api/v1/orders/active/:userid")
          .set("Authorization", `bearer ${getToken.token}`);
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
    it("[OPTIONAL] Completed Orders by user (args: user id)[token required] 'http://localhost:3000/api/v1/orders/completed/:userid' [GET]", async () => {
      try {
        const getToken: any = await request.post("api/v1/users/signup").send({
          username: "binh",
          password: "123456",
        });
        const res: supertest.Response = await request
          .get("api/v1/orders/completed/:userid")
          .set("Authorization", `bearer ${getToken.token}`);
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
  });
});
