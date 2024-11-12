"use server";

import prisma from "@/prisma";
import { SessionProps } from "../types";

export const createTeacherCred = async ({
  specialization,
  teacherPhoneNo,
  bio,
  session,
}: {
  specialization: string;
  teacherPhoneNo: string;
  bio: string;
  session: SessionProps;
}) => {
  try {
    await prisma.teacher.create({
      data: {
        specialization: specialization,
        phoneNumber: teacherPhoneNo,
        bio: bio,
        credentials: {
          connect: { id: session.user.id },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
