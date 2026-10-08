import { response } from "express";
import { db } from "../prisma/db.ts";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "./user.service.js";
import { sendError, sendSuccess } from "../libs/sendSucess.js";

export const getUserController = async (req, res, next) => {
  try {
    const user = await getUser();

    res.status(200).json({
      message: "user fetched",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    const existingEmail = await db.orm.public.User.first({ email });
    const existingUsername = await db.orm.public.User.first({ username });

  
    if (existingEmail && existingUsername) {
      return res.status(409).json({
        status: false,
        message: "Email and username already exist",
      });
    }


    if (existingEmail) {
      return res.status(409).json({
        status: false,
        message: "Email already exists",
      });
    }

  
    if (existingUsername) {
      return res.status(409).json({
        status: false,
        message: "Username already exists",
      });
    }

  
    const user = await createUser(req.body);

    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


 // try {
   // const user = await createUser(req.body);

    //res.status(201).json({
      //message: "user created",
     // data: user,
    //});
  //} catch (error) {
   // next(error);
 // }
  //};



export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingId= await db.orm.public.User.first({id})
    if(!existingId){
   return sendError(res,404,"ID NOT EXIST")
    }

    const user = await getUserById(id);

 return sendSuccess(res,200,"Data fetched Sucessfully ",user);
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
  const existingId= await  db.orm.public.User.first({id})
  if(!existingId){
    return sendError(res,404,`user not Updated, Id: ${id}`)

  
  }

    const user = await updateUser(id, req.body);

    return sendSuccess(res,200,`user  Updated, Id: ${id}`)
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db.orm.public.User.first({ id });

    if (!existing) {
      return sendSuccess(res,404,`Data not deleted, Id: ${id}`)
    }

    const user = await deleteUser(id);

   return sendSuccess(res,200,`Data deleted , Id: ${id}`)
  } catch (error) {
    next(error);
  }
};
