import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthGuard } from "../lib/AuthGuard";
import { GlobalContext, UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";
import { ColorModeContext, useMode } from "../theme";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const [theme, colorMode] = useMode();
  const [globalData, setGlobalData] = useState({
    dashboard: { activeTab: "home" },
  });
  const setGlobalContext = (tab) =>
    setGlobalData((prev) => {
      console.log(tab);
      return { dashboard: { activeTab: tab } };
    });
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={userData}>
          <GlobalContext.Provider value={{ globalData, setGlobalContext }}>
            <div className="app">
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1.0, width=device-width"
                />
              </Head>
              <CssBaseline />
              <main className="content">
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  minHeight="100vh"
                >
                  <Navbar />
                  <Box
                    display="flex"
                    zIndex="0"
                    height="fit-content"
                    width="100vw"
                    maxWidth="80rem"
                    minHeight="calc(100vh - 128px - 64px)"
                    justifyContent="center"
                  >
                    {Component.requireAuth ? (
                      <AuthGuard>
                        <Component {...pageProps} />
                      </AuthGuard>
                    ) : (
                      <Component {...pageProps} />
                    )}
                  </Box>
                  <Footer className="" />
                </Box>
              </main>
            </div>
          </GlobalContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
  // className="flex flex-col justify-start min-h-screen"
}

export default MyApp;
