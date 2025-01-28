"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        avaliableCopies: params.totalCopies,
      })
      .returning();

    return {
      sucess: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      sucess: false,
      message: "An error occurred while creating the book",
    };
  }
};
