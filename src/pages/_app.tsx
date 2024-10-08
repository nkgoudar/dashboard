import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Header from "@/components/Header";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Home from ".";

function MyApp({ Component, pageProps, router }: AppProps) {
  const { isAuthenticated } = useAuth();
  const currentRouter = useRouter(); // Get the router here

  useEffect(() => {
    // Redirect to index if not logged in and trying to access a protected page
    if (!isAuthenticated && currentRouter.pathname !== "/") {
      currentRouter.push("/");
    }
  }, [isAuthenticated, currentRouter]);

  // Only render the component if the user is logged in, or if it's the index page
  if (isAuthenticated) {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Navbar />
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div className="header">
            <Header />
          </div>
          <div style={{ marginTop: "75px" }}>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    );
  }

  // Optionally, render a loading or redirection state
  return <Home></Home>
}

function AppWrapper(props: AppProps) {
  return (
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
  );
}

export default AppWrapper;
