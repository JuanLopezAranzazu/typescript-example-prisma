import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    res.json({ data: users });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) throw new Error("User not found");

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) throw new Error("User already exists");

    const new_user = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    res.status(201).json({ data: new_user });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { email, name } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        email,
        name,
      },
    });

    if (!user) throw new Error("User not found");

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.delete({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (!user) throw new Error("User not found");

      res.status(204).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
);

export { router };
