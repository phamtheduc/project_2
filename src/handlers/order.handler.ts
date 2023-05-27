import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Order } from "../models/order.entity";
import { STATUS } from "../util/contant";

const activeOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(Order);
    const userid = req.params.userid;
    const orders = await userRepository.find({
      relations: {
        user: true
      },
      where: {
        user: {
          id: userid
        },
        status: STATUS.ACTIVE,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

const completedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(Order);
    const userid = req.params.userid;
    const orders = await userRepository.find({
      // where: {
      //   userid,
      //   status: STATUS.COMPLETED,
      // },
    });
    res.status(200).json(orders);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

export default {
  activeOrders,
  completedOrders,
};
