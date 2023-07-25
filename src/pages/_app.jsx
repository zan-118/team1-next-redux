import { ReduxProvider } from "@/redux/provider";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  );
}
