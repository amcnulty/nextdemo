export const Pagination = ({
  size,
  perPage,
  current,
  onPageChange,
}: {
  size: number;
  perPage: number;
  current: number;
  onPageChange: (index: number) => void;
}) => {
  return (
    <div className="inline-flex flex-col ">
      <div className="join">
        {Array.from("X".repeat(Math.ceil(size / perPage))).map((x, index) => (
          <button
            key={index}
            className={`btn join-item ${index === current ? "btn-active" : ""}`}
            onClick={() => {
              onPageChange(index);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <span className="self-end">
        Showing:{" "}
        <span className="font-bold">
          {current * perPage + 1} -{" "}
          {(current + 1) * perPage > size ? size : (current + 1) * perPage}
        </span>
      </span>
    </div>
  );
};
