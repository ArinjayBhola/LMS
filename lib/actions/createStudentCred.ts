"use server";

import prisma from "@/prisma";
import { SessionProps } from "../types";

export async function createStudentCred({
  dob,
  highestQualification,
  studentPhoneNo,
  session,
}: {
  dob: string;
  highestQualification: string;
  studentPhoneNo: string;
  session: SessionProps;
}) {
  try {
    await prisma.student.create({
      data: {
        dateOfBirth: dob,
        highestQualification: highestQualification,
        phoneNumber: studentPhoneNo,
        credentials: {
          connect: { id: session.user.id },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}
