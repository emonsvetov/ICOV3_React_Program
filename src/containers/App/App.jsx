import React, { Fragment, useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import Routes from "./Routes";
import store from "./store";
import "../../scss/app.scss";
import {
  getBearer,
  getOrganization,
  getAuthUser,
  getAuthProgram,
  getAuthRootProgram,
  getAuthPoints,
  getAuthCart,
  setAuthDomain,
  getAuthDomain,
} from "./auth";
import { setOrganization } from "@/redux/actions/organizationActions";
import { setAuthUser } from "@/redux/actions/userActions";
import { setStoreProgram } from "@/redux/actions/programActions";
import { setRootProgram } from "@/redux/actions/rootProgramActions";
import { setPointBalance } from "@/redux/actions/balanceActions";
import { setCart } from "@/redux/actions/cartActions";
import { FlashMessage } from "@/shared/components/flash";
import { setDomain } from "@/redux/actions/domainActions";
import { setTemplate } from "@/redux/actions/templateActions";
import { ThemeProvider } from "@/context/themeContext";

// require('dotenv').config()
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/api/v1";
if (!axios.defaults.headers.common["Authorization"])
  axios.defaults.headers.common["Authorization"] = getBearer();
if (!axios.defaults.headers.post["Content-Type"])
  axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 500);
      setAuthOrganization();
    });
  }, []);

  const setAuthOrganization = () => {
    getAuthDomain().then((domain) => {
      // console.log(domain)
      store.dispatch(setDomain(domain));
      store.dispatch(
        setTemplate({ type: "origin", ...domain.program.template })
      );
      setCustomLink(domain.program.template.font_family);
    });
    store.dispatch(setOrganization(getOrganization()));
    store.dispatch(setAuthUser(getAuthUser()));
    store.dispatch(setStoreProgram(getAuthProgram()));
    store.dispatch(setRootProgram(getAuthRootProgram()));
    store.dispatch(setCart(getAuthCart()));
    getAuthPoints().then((balance) => {
      store.dispatch(setPointBalance(balance));
    });
  };

  const setCustomLink = (href) => {
    if (href) {
      let fullHref =
        "https://fonts.googleapis.com/css?family=" +
        href +
        ":100,300,400,500,700,900";
      let head = document.head;
      let link = document.createElement("link");

      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = fullHref;

      head.appendChild(link);

      let style = document.createElement("style");
      style.innerHTML =
        "*, body, div, p, span, li, ul, i { font-family: '" +
        href +
        "', sans-serif;} ";

      head.appendChild(style);
    }
  };

  return (
    <Router>
      <Fragment>
        {/* {!isLoaded && (
              <div className={`load${isLoading ? '' : ' loaded'}`}>
                <div className="load__icon-wrap">
                  <svg className="load__icon">
                    <path fill="#4ce1b6" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                  </svg>
                </div>
              </div>
            )} */}
        <Routes />
        <FlashMessage />
      </Fragment>
    </Router>
  );
};

const AppProvider = () => {
  return (
    <Suspense fallback={"loading"}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </Suspense>
  );
};

export default AppProvider;
