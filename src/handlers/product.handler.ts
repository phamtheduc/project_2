import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Product } from "../models/product.entity";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = AppDataSource.getRepository(Product);
  try {
    const products = await userRepository.find();
    res.status(200).json(products);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

const getOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Product);
  try {
    const id = req.params.id;
    const products = await userRepository.findOne({ where: { id } });
    res.status(200).json(products);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = AppDataSource.getRepository(Product);
  try {
    const productData = req.body;
    const products = await userRepository.save({ ...productData });
    res.status(200).json(products);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

const getTop5Product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Product);
  try {
    const products = await userRepository.find({
      take: 5,
      order: { price: "desc" },
    });
    res.status(200).json(products);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

const filterProductByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Product);
  try {
    const category = req.params.category;
    const products = await userRepository.find({
      where: {
        category,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

export default {
  getProducts,
  getOneProduct,
  addProduct,
  getTop5Product,
  filterProductByCategory,
};
