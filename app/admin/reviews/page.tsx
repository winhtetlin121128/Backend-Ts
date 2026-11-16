import Listbottom from "../../../components/admin/footer";
import Blankbox from "../../../public/img/box.png";
import { prisma } from "../../lib/prisma";
import ReviewForm from "./review-form";

export default async function AdminReview() {
  "use cache";

  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      name: true,
      comment: true,
      rating: true,
    },
  });

  return (
    <div className="flex justify-center items-start pl-3 pr-3 pt-5 pb-20 w-full gap-3">
      <section className="w-[70%] border border-[#000]/20 rounded-xl overflow-hidden">
        <header className="border-b text-[13px] border-[#000]/20 h-13 flex justify-start items-center pl-3 pr-3 font-[Valley] text-[#000]/60">
          <span className="w-[10%]">Id</span>
          <span className="w-[20%]">Name</span>
          <span className="w-[50%]">Comment</span>
          <span className="w-[10%] flex justify-center">Rating</span>
          <span></span>
        </header>

        <div className="flex flex-col">
          {reviews.length === 0 ? (
            <div className="w-full flex flex-col justify-center items-center pt-10 pb-10 font-[Valley]">
              <img src={Blankbox.src} className="w-10" alt="" />
              <p className="text-[15px] mt-5">Empty in the review</p>
              <span className="text-[13px] text-[#000]/60">
                Start to take a review from learner or member
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              {reviews.slice(0, 21).map((item, index) => (
                <div
                  key={item.id}
                  className="p-3 font-[Valley] flex items-start h-20 border-b border-[#000]/20"
                >
                  <span className="text-[13px] font-[Valley] w-[10%] text-[#000]/60">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </span>
                  <h3 className="text-[14px] w-[20%] font-[Recursive] h-full text-[#000]/80 font-bold">
                    {item.name}
                  </h3>
                  <p className="text-[13px] text-[#000]/60 w-[50%] h-full">
                    {item.comment}
                  </p>
                  <span className="w-[10%] flex justify-center h-full text-[13px] font-[Valley] text-[#000]/60">
                    {item.rating}/10
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Listbottom />
      </section>

      <ReviewForm />
    </div>
  );
}
