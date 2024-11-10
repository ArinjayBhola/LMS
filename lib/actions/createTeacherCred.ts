import prisma from "@/prisma";
import { SessionProps } from "../types";

export const createTeacherCred = async ({
  specialization,
  teacherPhoneNo,
  joiningDate,
  bio,
  session,
}: {
  specialization: string;
  teacherPhoneNo: string;
  joiningDate: string;
  bio: string;
  session: SessionProps;
}) => {
  try {
    await prisma.teacher.create({
      data: {
        specialization: specialization,
        phoneNumber: teacherPhoneNo,
        joinDate: joiningDate,
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
