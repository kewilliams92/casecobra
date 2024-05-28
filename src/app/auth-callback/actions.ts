"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

//Get the auth status of the user
export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession(); //using Kinde we can destructure the getUser function from the getKindeServerSession
  const user = await getUser(); //then we can use the getUser function to get the user data

  //if the user data is invalid, we throw an error
  if (!user?.id || !user.email) {
    throw new Error("Invalid user data");
  }

  //we then check if the user exists in the database
  const existingUser = await db.user.findFirst({
    where: { id: user.id },
  });

  //if the user does not exist, we create a new user in the database
  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  }

  //return a success message
  return { success: true };
};
