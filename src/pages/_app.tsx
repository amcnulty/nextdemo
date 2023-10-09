/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Session } from "next-auth";
import { type AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "~/context/AppContext";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  );
};

export default MyApp;
