import { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import AppDataSource from "../data-source";
import { User } from "../models/user.entity";

const signupAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInfo: { username: string; password: string } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const hashPassword = await bcrypt.hash(
      userInfo.password,
      Number(process.env.SALT_ROUND)
    );
    userRepository
      .save({
        id: uuidv4(),
        ...userInfo,
        password: hashPassword,
      })
      .then((result) => {
        if (result) {
          const token = jwt.sign(
            { username: result.username },
            process.env.JWT_SECRET || ""
          );
          res
            .status(200)
            .json({ message: "Create user successfull", data: token });
        }
      });
  } catch (error: unknown) {
    next((error as { message: string })?.message);
  }
};

const loginAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { username, password } = req.body;
    const findUser = await userRepository.findOne({
      where: { username },
    });
    if (findUser) {
      const verifyPassword = await bcrypt.compare(password, findUser?.password);
      if (verifyPassword) {
        const token = jwt.sign(
          { username: findUser.username },
          process.env.JWT_SECRET || ""
        );
        return res.status(200).json(token);
      }
      next("Password is incorrect");
    } else {
      next("Cannot found this user");
    }
  } catch (error: unknown) {
    throw new Error((error as { message: string })?.message);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (error: unknown) {
    next((error as { message: string })?.message);
  }
};

const getOneUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const id = req.params.id;
    const userData = await userRepository.findOne({ where: { id } });
    res.status(200).json(userData);
  } catch (error: unknown) {
    next((error as { message: string })?.message);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const userInfo: { username: string; password: string } = req.body;
    const userData = await userRepository.save({ ...userInfo });
    res.status(200).json(userData);
  } catch (error: unknown) {
    next((error as { message: string })?.message);
  }
};

export default { signupAccount, loginAccount, getUsers, getOneUsers,addUser };
