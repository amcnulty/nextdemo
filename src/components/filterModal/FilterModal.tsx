/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useRef } from "react";
import {
  appContext,
  selectCategory,
  selectRating,
  selectPriceSort,
  selectSort,
} from "~/context/AppContext";
import { useContextSelector } from "~/hooks/useContextSelector";
import { useContextSetters } from "~/hooks/useContextSetters";

export const FilterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  const category = useContextSelector(appContext, selectCategory) as string;
  const sort = useContextSelector(appContext, selectSort) as string;
  const rating = useContextSelector(appContext, selectRating) as number;
  const priceSort = useContextSelector(appContext, selectPriceSort) as string;
  const { setCategory, setSort, setRating, setPriceSort } =
    useContextSetters(appContext);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    isOpen && modalRef.current?.showModal();
  }, [isOpen]);

  useEffect(() => {
    modalRef.current?.addEventListener("close", onCloseRef.current);
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value));
  };

  const handlePriceSortChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPriceSort(event.target.value);
  };

  const resetAllFilters = () => {
    setSort();
    setCategory();
    setRating();
    setPriceSort();
  };

  return (
    <dialog className="modal modal-bottom" ref={modalRef}>
      <div className="modal-box">
        <div className="flex justify-end">
          <button className="btn btn-outline btn-sm" onClick={resetAllFilters}>
            Reset All
          </button>
        </div>
        <h3 className="text-lg text-center font-bold">Sort</h3>
        <h3 className="text-md font-bold">Name</h3>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">A - Z</span>
            <input
              type="radio"
              name="sort-group"
              className="radio-primary radio"
              value="asc"
              checked={sort === "asc"}
              onChange={handleSortChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Z - A</span>
            <input
              type="radio"
              name="sort-group"
              className="radio-primary radio"
              value="desc"
              checked={sort === "desc"}
              onChange={handleSortChange}
            />
          </label>
        </div>
        {sort && (
          <button
            className="btn btn-primary btn-outline btn-sm mb-2 w-1/4"
            onClick={() => setSort()}
          >
            Reset
          </button>
        )}
        <hr />
        <h3 className="text-md font-bold">Price</h3>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Low to High</span>
            <input
              type="radio"
              name="priceSort-group"
              className="radio-primary radio"
              value="asc"
              checked={priceSort === "asc"}
              onChange={handlePriceSortChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">High to Low</span>
            <input
              type="radio"
              name="priceSort-group"
              className="radio-primary radio"
              value="desc"
              checked={priceSort === "desc"}
              onChange={handlePriceSortChange}
            />
          </label>
        </div>
        {priceSort && (
          <button
            className="btn btn-primary btn-outline btn-sm mb-2 w-1/4"
            onClick={() => setPriceSort()}
          >
            Reset
          </button>
        )}
        <h3 className="text-lg text-center font-bold">Filter</h3>
        <h3 className="text-md font-bold">Category</h3>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Men&apos;s Clothing</span>
            <input
              type="radio"
              name="category-group"
              className="radio-primary radio"
              value="men's clothing"
              checked={category === "men's clothing"}
              onChange={handleCategoryChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Women&apos;s Clothing</span>
            <input
              type="radio"
              name="category-group"
              className="radio-primary radio"
              value="women's clothing"
              checked={category === "women's clothing"}
              onChange={handleCategoryChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Jewelery</span>
            <input
              type="radio"
              name="category-group"
              className="radio-primary radio"
              value="jewelery"
              checked={category === "jewelery"}
              onChange={handleCategoryChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Electronics</span>
            <input
              type="radio"
              name="category-group"
              className="radio-primary radio"
              value="electronics"
              checked={category === "electronics"}
              onChange={handleCategoryChange}
            />
          </label>
        </div>
        {category && (
          <button
            className="btn btn-primary btn-outline btn-sm mb-2 w-1/4"
            onClick={() => setCategory()}
          >
            Reset
          </button>
        )}
        <hr />
        <h3 className="text-md font-bold">Rating</h3>
        <div className="form-control">
          <label className="label cursor-pointer">
            <div className="rating rating-xs">
              {Array.from("X".repeat(5)).map((x: any, index: number) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-orange-400"
                  checked={index === 0}
                  readOnly
                />
              ))}
            </div>
            <input
              type="radio"
              name="rating-group"
              className="radio-primary radio"
              value={1}
              checked={rating === 1}
              onChange={handleRatingChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <div className="rating rating-xs">
              {Array.from("X".repeat(5)).map((x: any, index: number) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked={index === 1}
                  readOnly
                />
              ))}
            </div>
            <input
              type="radio"
              name="rating-group"
              className="radio-primary radio"
              value={2}
              checked={rating === 2}
              onChange={handleRatingChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <div className="rating rating-xs">
              {Array.from("X".repeat(5)).map((x: any, index: number) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-3"
                  className="mask mask-star-2 bg-orange-400"
                  checked={index === 2}
                  readOnly
                />
              ))}
            </div>
            <input
              type="radio"
              name="rating-group"
              className="radio-primary radio"
              value={3}
              checked={rating === 3}
              onChange={handleRatingChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <div className="rating rating-xs">
              {Array.from("X".repeat(5)).map((x: any, index: number) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-orange-400"
                  checked={index === 3}
                  readOnly
                />
              ))}
            </div>
            <input
              type="radio"
              name="rating-group"
              className="radio-primary radio"
              value={4}
              checked={rating === 4}
              onChange={handleRatingChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <div className="rating rating-xs">
              {Array.from("X".repeat(5)).map((x: any, index: number) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-5"
                  className="mask mask-star-2 bg-orange-400"
                  checked={index === 4}
                  readOnly
                />
              ))}
            </div>
            <input
              type="radio"
              name="rating-group"
              className="radio-primary radio"
              value={5}
              checked={rating === 5}
              onChange={handleRatingChange}
            />
          </label>
        </div>
        {rating && (
          <button
            className="btn btn-primary btn-outline btn-sm mb-2 w-1/4"
            onClick={() => setRating()}
          >
            Reset
          </button>
        )}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn me-2">Close</button>
            <button className="btn btn-primary">Filter</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
