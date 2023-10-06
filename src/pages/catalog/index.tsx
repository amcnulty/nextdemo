import Link from "next/link";
import Layout from "../../components/layout";
import useSWR from "swr";
import { fetcher } from "~/util/fetcher";
import { type Product } from "~/types/Product";
import { ProductCard } from "~/components/product-card/ProductCard";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "~/components/pagination/Pagination";
import { FilterModal } from "~/components/filterModal/FilterModal";
import { useContextSelector } from "~/hooks/useContextSelector";
import {
  appContext,
  selectCategory,
  selectPriceSort,
  selectRating,
  selectSort,
} from "~/context/AppContext";
import { useContextSetters } from "~/hooks/useContextSetters";

const PER_PAGE = 5;

export default function Catalog() {
  const router = useRouter();
  const category = useContextSelector(appContext, selectCategory) as string;
  const sort = useContextSelector(appContext, selectSort) as string;
  const priceSort = useContextSelector(appContext, selectPriceSort) as string;
  const rating = useContextSelector(appContext, selectRating) as number;
  const { setCategory, setSort } = useContextSetters(appContext);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCategory(router.query.category);
    setSort(router.query.sort);
  }, [router.query.category, router.query.sort, setCategory, setSort]);

  const { data, isLoading } = useSWR<[Product]>(
    category
      ? `https://fakestoreapi.com/products/category/${category}`
      : `https://fakestoreapi.com/products`,
    fetcher,
  );

  const filteredData: Product[] = useMemo(() => {
    setPage(0);
    return !isLoading
      ? data!
          .filter((product) =>
            rating
              ? product.rating.rate > rating - 0.5 &&
                product.rating.rate < rating + 0.5
              : true,
          )
          .sort((a, b) =>
            sort
              ? a.title > b.title
                ? sort === "asc"
                  ? 1
                  : -1
                : sort === "asc"
                ? -1
                : 1
              : 0,
          )
          .sort((a, b) =>
            priceSort
              ? a.price > b.price
                ? priceSort === "asc"
                  ? 1
                  : -1
                : priceSort === "asc"
                ? -1
                : 1
              : 0,
          )
      : [];
  }, [data, isLoading, priceSort, rating, sort]);

  return (
    <Layout>
      <div className="breadcrumbs bg-slate-100 ps-2 text-sm">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>{category ? <Link href="/catalog">Catalog</Link> : "Catalog"}</li>
          {category && <li>{category}</li>}
        </ul>
      </div>
      <div className="flex justify-between p-2">
        <button
          onClick={() => setShowModal(!showModal)}
          className="m-0 cursor-pointer border-none p-0 focus:outline-none"
        >
          <svg
            width="64px"
            height="64px"
            viewBox="-12 -12 48.00 48.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M21 6H19M21 12H16M21 18H16M7 20V13.5612C7 13.3532 7 13.2492 6.97958 13.1497C6.96147 13.0615 6.93151 12.9761 6.89052 12.8958C6.84431 12.8054 6.77934 12.7242 6.64939 12.5617L3.35061 8.43826C3.22066 8.27583 3.15569 8.19461 3.10948 8.10417C3.06849 8.02393 3.03853 7.93852 3.02042 7.85026C3 7.75078 3 7.64677 3 7.43875V5.6C3 5.03995 3 4.75992 3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899C3.75992 4 4.03995 4 4.6 4H13.4C13.9601 4 14.2401 4 14.454 4.10899C14.6422 4.20487 14.7951 4.35785 14.891 4.54601C15 4.75992 15 5.03995 15 5.6V7.43875C15 7.64677 15 7.75078 14.9796 7.85026C14.9615 7.93852 14.9315 8.02393 14.8905 8.10417C14.8443 8.19461 14.7793 8.27583 14.6494 8.43826L11.3506 12.5617C11.2207 12.7242 11.1557 12.8054 11.1095 12.8958C11.0685 12.9761 11.0385 13.0615 11.0204 13.1497C11 13.2492 11 13.3532 11 13.5612V17L7 20Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <Pagination
          size={filteredData?.length ?? 0}
          perPage={PER_PAGE}
          current={page}
          onPageChange={(index) => setPage(index)}
        />
      </div>
      {isLoading ? (
        <span
          data-testid="loadingIndicator"
          className="loading loading-dots loading-lg"
        ></span>
      ) : (
        filteredData
          .slice(page * PER_PAGE, (page + 1) * PER_PAGE)
          .map((product) => <ProductCard key={product.id} product={product} />)
      )}
      <div className="flex justify-end p-2">
        <Pagination
          size={filteredData?.length ?? 0}
          perPage={PER_PAGE}
          current={page}
          onPageChange={(index) => setPage(index)}
        />
      </div>

      <FilterModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </Layout>
  );
}
