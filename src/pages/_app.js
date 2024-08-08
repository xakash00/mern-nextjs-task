import React from "react"
import { Provider } from "react-redux";
import { wrapper } from "components/redux";
import { useRouter } from "next/router";
import "components/styles/globals.css";
import Cookies from "js-cookie";
import axios from "axios";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, session } = props;
  const Router = useRouter()
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
    //eslint-disable-next-line
  }, []);

  axios.interceptors.response.use(
    (response) => {
      console.log(response)
      return response;
    },
    (error) => {
      Router.push("/login")
      Cookies.remove("token")
      return Promise.reject(error);
    }
  );

  return <Provider store={store}><Component {...pageProps} /></Provider>;
}

