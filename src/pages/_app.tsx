import { type AppType } from "next/dist/shared/lib/utils";
import { AppProvider } from "~/context/AppContext";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default MyApp;
