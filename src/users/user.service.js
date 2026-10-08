import { db } from "../prisma/db.ts";

export const getUser = async () => {
  return await db.orm.public.User.all();
};

export const createUser = async (data) => {
  return await db.orm.public.User.create(data);
};

export const getUserById = async (id) => {
  return await db.orm.public.User.first({ id: String(id) });
};

export const updateUser = async (id, data) => {
  return await db.orm.public.User.where({
    id,
  }).update(data);
};

export const deleteUser = async (id) => {
  return await db.orm.public.User.where({ id }).delete();
};
