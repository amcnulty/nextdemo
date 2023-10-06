import { type Rating } from "~/types/Product";

export const RatingComponent = ({ rating }: { rating: Rating }) => {
  return (
    <div className="m-2 inline-flex flex-col">
      {/* <div className="rating rating-lg rating-half">
        <input type="radio" name="rating-10" className="rating-hidden" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" checked />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-1" />
        <input type="radio" name="rating-10" className="bg-green-500 mask mask-star-2 mask-half-2" />
      </div> */}
      <div className="rating rating-half rating-lg">
        <div className="badge badge-ghost self-center">{rating.rate}</div>
        {Array.from("x".repeat(10)).map((item: any, index: number) => (
          <input
            key={index}
            type="radio"
            name="rating-xyz"
            className={`mask mask-star-2 mask-half-${
              index % 2 === 0 ? 1 : 2
            } bg-orange-400`}
            readOnly
            checked={rating.rate >= (index + 1) * 0.5}
          />
          ))}
      </div>
      <p className="self-end">({rating.count})</p>
    </div>
  );
};
