/*
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// interface User {
//   email: string;
//   name: string;
// }

// type roles = "admin" | "user";

// crear roles

// async function create_roles() {
//   const roles: string[] = ["admin", "user"];

//   for (let i = 0; i < roles.length; i++) {
//     await prisma.role.create({
//       data: {
//         name: roles[i],
//       },
//     });
//   }
// }

// crear usuarios

// async function create_users() {
//   const users: User[] = [
//     {
//       email: "jimporter@gmail.com",
//       name: "jim porter",
//     },
//     {
//       email: "angelamartin@gmail.com",
//       name: "angela martin",
//     },
//   ];

//   for (let i = 0; i < users.length; i++) {
//     await prisma.user.create({
//       data: {
//         email: users[i]["email"],
//         name: users[i]["name"],
//       },
//     });
//   }
// }

// crear relacion usuario rol

// async function create_users_roles(userId: number, roles: roles[]) {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });

//   if (!user) throw new Error("User not found");

//   for (let i = 0; i < roles.length; i++) {
//     const role = await prisma.role.findUnique({
//       where: {
//         name: roles[i],
//       },
//     });

//     if (!role) throw new Error("Role not found");

//     await prisma.usersRoles.create({
//       data: {
//         userId: user["id"],
//         roleId: role["id"],
//       },
//     });
//   }
// }

async function database_init() {
  // await create_roles();
  // await create_users();
  // await create_users_roles(1, ["admin", "user"]);

  const users = await prisma.user.findMany({
    where: {
      roles: {
        some: {
          role: {
            name: {
              in: ["admin", "user"],
            },
          },
        },
      },
    },
  });
  console.log(users);
}

async function main() {
  await database_init();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
*/

import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

// routes
import { router as userRouter } from "./routes/user";
app.use("/users", userRouter);

import { logErrors, errorHandler } from "./middlewares/handleErrors";
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
