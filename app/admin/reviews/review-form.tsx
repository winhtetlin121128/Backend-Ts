"use client";

import { useActionState } from "react";
import { createReview } from "./actions";

const initialState = { message: "", success: false };

export default function ReviewForm() {
  const [state, formAction, isPending] = useActionState(createReview, initialState);

  return (
    <section className="pb-5 w-[30%] border border-[#000]/20 rounded-xl flex flex-col items-center">
      <header className="flex gap-5 border-b h-15 border-[#000]/20 w-full items-center justify-center">
        <span className="flex justify-center items-center w-10 h-10 rounded-xl text-[#fff] text-[30px] bg-orange-400 shadow-lg shadow-orange-600">
          +
        </span>
        <div className="flex flex-col">
          <h3 className="text-[15px] font-[Recursive] font-bold">Add a review</h3>
          <h3 className="text-[12px] font-[Valley]">Share a review from member</h3>
        </div>
      </header>

      <form action={formAction} className="w-full p-5 font-[Valley]">
        <h3 className="text-[13px]">Name</h3>
        <input
          name="name"
          type="text"
          required
          placeholder="Enter a name"
          className="border border-[#000]/20 w-full h-10 mt-2 pl-3 text-[13px] rounded-md"
        />

        <h3 className="text-[13px] mt-5">Comment</h3>
        <textarea
          name="comment"
          required
          placeholder="Write the review here"
          className="border resize-none w-full h-40 border-[#000]/20 mt-2 text-[13px] pl-3 pt-3 rounded-md"
        />

        <h3 className="text-[13px] mt-5">Rate</h3>
        <input
          name="rating"
          type="number"
          min="1"
          max="10"
          required
          placeholder="Rate between 1 - 10"
          className="border border-[#000]/20 w-full h-10 mt-2 pl-3 text-[13px] rounded-md"
        />

        <h3 className="text-[13px] mt-5">
          Event <span className="text-[#000]/60">( optional )</span>
        </h3>
        <input
          type="text"
          placeholder="Event name"
          className="border border-[#000]/20 w-full h-10 mt-2 pl-3 text-[13px] rounded-md"
        />

        <h3 className="text-[13px] mt-5">Status</h3>
        <div className="flex gap-3 mt-3">
          <li className="list-none text-[13px] flex justify-center items-center gap-1">
            <input type="checkbox" />
            <span>Approved</span>
          </li>
          <li className="list-none text-[13px] flex justify-center items-center gap-1">
            <input type="checkbox" />
            <span>Pending</span>
          </li>
          <li className="list-none text-[13px] flex justify-center items-center gap-1">
            <input type="checkbox" />
            <span>Reject</span>
          </li>
        </div>

        {state.message && (
          <p
            role="status"
            className={`mt-4 text-[13px] ${state.success ? "text-green-700" : "text-red-600"}`}
          >
            {state.message}
          </p>
        )}

        <button
          disabled={isPending}
          className="text-[13px] bg-orange-400 pt-1 pb-1 text-[#fff] w-full mt-5 rounded-md cursor-pointer disabled:opacity-60"
        >
          {isPending ? "Creating..." : "Create Review"}
        </button>
      </form>
    </section>
  );
}
