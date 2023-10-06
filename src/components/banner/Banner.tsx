import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Banner = () => {
  const router = useRouter();
  const [count, setCount] = useState(40);
  const [minutes, setMinutes] = useState(24);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        setCount(59); // Reset to 59 when count reaches 0
        setMinutes((minutes) => minutes - 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  return (
    <>
      {router.asPath !== "/" ? (
        <div className="alert alert-info flex rounded-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Hurry before the sale is over!</span>
          <span className="countdown font-mono text-2xl">
            <span style={{ "--value": 10 } as React.CSSProperties}></span>:
            <span style={{ "--value": minutes } as React.CSSProperties}></span>:
            <span style={{ "--value": count } as React.CSSProperties}></span>
          </span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
