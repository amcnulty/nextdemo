import Link from "next/link";
import { useRouter } from "next/router";

export const Footer = () => {
  const router = useRouter();

  return (
    <div className="btm-nav">
    <button className={`${router.asPath === '/' ? 'active bg-neutral-content' : ''}`}>
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
      </button>
      <button className={`${router.asPath === '/catalog' ? 'active bg-neutral-content' : ''}`}>
        <Link href="/catalog">
          <svg
            fill="#000000"
            height="64px"
            width="64px"
            version="1.1"
            id="XMLID_237_"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-24 -24 72.00 72.00"
            stroke="#000000"
            strokeWidth="0.00024000000000000003"
            transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="0.048"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="catalog">
                {" "}
                <g>
                  {" "}
                  <path d="M12,23.3L0,20V3l4,1V1l8,2.3L20,1v3l4-1v17L12,23.3z M2,18.5l10,2.8l10-2.7v-13l-2,0.5v11l-8,2.2L4,17V6L2,5.5V18.5z M13,5.1V17l5-1.4v-12L13,5.1z M6,15.5l5,1.4V5.1L6,3.7V15.5z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </Link>
      </button>
      <button className={`${router.asPath === '/about' ? 'active bg-neutral-content' : ''}`}>
        <Link href="/about">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </button>
    </div>
  );
};
