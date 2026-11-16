"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

type ReviewActionState = {
  message: string;
  success: boolean;
};

export async function createReview(
  _previousState: ReviewActionState,
  formData: FormData,
): Promise<ReviewActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();
  const rating = Number(formData.get("rating"));

  if (!name || !comment || !Number.isInteger(rating) || rating < 1 || rating > 10) {
    return {
      message: "Enter a name, a review, and a rating from 1 to 10.",
      success: false,
    };
  }

  await prisma.review.create({
    data: { name, comment, rating },
  });

  revalidatePath("/admin/reviews");

  return { message: "Review created.", success: true };
}
