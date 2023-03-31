import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users_roles = await prisma.usersRoles.findMany({
      include: {
        role: true,
        user: true,
      },
    });
    res.json({ data: users_roles });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { roles, userId } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");

    let arr = [];

    for (let i = 0; i < roles.length; i++) {
      const role = await prisma.role.findUnique({
        where: {
          name: roles[i],
        },
      });

      if (!role) throw new Error("Role not found");

      const new_role_user = await prisma.usersRoles.create({
        data: {
          userId: user["id"],
          roleId: role["id"],
        },
      });
      arr.push(new_role_user);
    }

    res.json({ data: arr });
  } catch (error) {
    next(error);
  }
});

export { router };
