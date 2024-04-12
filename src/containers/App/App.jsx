import React, { Fragment, useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import Routes from "./Routes";
import store from "./store";
import "../../scss/theme_variable.scss";
import "../../scss/app.scss";
import {
  getBearer,
  getOrganization,
  getAuthUser,
  getAuthProgram,
  getAuthRootProgram,
  getAuthPoints,
  getAuthCart,
  getAuthDomain
} from "./auth";
import { setOrganization } from "@/redux/actions/organizationActions";
import { setAuthUser } from "@/redux/actions/userActions";
import { setStoreProgram } from "@/redux/actions/programActions";
import { setRootProgram } from "@/redux/actions/rootProgramActions";
import { setPointBalance } from "@/redux/actions/balanceActions";
import { setCart } from "@/redux/actions/cartActions";
import { FlashMessage } from "@/shared/components/flash";
import { setDomain } from "@/redux/actions/domainActions";
import { setTemplate } from "@/redux/actions/templateActions"; //from API
import { setThemeAction } from "@/redux/actions/themeActions"; //Local Theme
import useIdleTimeout from "@/shared/useIdleTimeout";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton";
import CloseIcon from "mdi-react/CloseIcon";

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
  const [user, setUser] = useState(false);
  const [program, setProgram] = useState(false);
  const [open, setOpen] = useState(false);

  const timeout = 30 * 60 * 1_000; // 30m
  const promptBeforeIdle = 30 * 1_000 // prompt before 30s

  const onActive = () => {
    setOpen(false)
  }

  const onPrompt = () => {
    setOpen(true)
  }

  const handleStillHere = () =>{
    idleTimer.activate()
  }

  const {idleTimer} = useIdleTimeout({ onActive, onPrompt, timeout, promptBeforeIdle })

  useEffect(() => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 500);
      setAuthOrganization();
  }, []);

  const setAppTemplate = (domain, program = null) => {
    let template = domain.program?.template ?? null
    if( program && program?.template) {
      template = program.template
    }
    if ( template ) {
      template.name = template.name.toLowerCase();
      store.dispatch(setTemplate(template));
      setCustomLink(template.font_family, template);
      setThemeCss(template);
      const dirName = template?.name ? template.name : "default";
      const dirUrl = `${process.env.PUBLIC_URL}/theme/${dirName}`;
      store.dispatch(
        setThemeAction({ name: template.name, alias: dirName, dirName, dirUrl })
      );
    }
  }

  const setAppDomain = (domain, program = null) => {
    store.dispatch(setDomain(domain));
    setAppTemplate(domain, program)
  }

  useEffect(() => {
    if( user?.id && program?.id ) {
      // console.log("program loaded")
      // console.log(program)
      store.dispatch(setOrganization(getOrganization()));
      store.dispatch(setAuthUser(getAuthUser()));
      // store.dispatch(setStoreProgram(getAuthProgram()));
      store.dispatch(setRootProgram(getAuthRootProgram()));
      store.dispatch(setCart(getAuthCart()));
      getAuthPoints().then((balance) => {
        store.dispatch(setPointBalance(balance));
      });
      getAuthDomain().then((domain) => {
        if( domain.program.id !== program.id ) {
          domain.program = program
          setAppDomain(domain, program)
        }
      })
    }
  }, [user, program]);

  const setAuthOrganization = () => {
    getAuthDomain(true).then((domain) => {
      setAppDomain(domain)
    })

    const authUser = getAuthUser()

    if( authUser ) {
      idleTimer.start();
      getAuthProgram( true )
      .then( authProgram => {
        if( authProgram ) {
          setUser(authUser)
          setProgram(authProgram)
        }
      })
    }
  };

  const setCustomLink = (href, template) => {
    let head = document.head;
    if (template.name === 'clear') {
      let originalStyle = document.createElement("style");
      originalStyle.innerHTML =
        "*, body, div, p, span, li, ul, i { font-family: 'CircularStdBold', sans-serif;} ";
      head.appendChild(originalStyle);
    }
    if (href) {
      let fullHref =
        "https://fonts.googleapis.com/css?family=" +
        href +
        ":100,300,400,500,700,900";
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

  const setThemeCss = (template) => {
    if (template.theme_color) {
      document.documentElement.style.setProperty('--app-themeColor', template.theme_color)
    }
  };

  const IdleModal = ({open, setOpen, handleStillHere}) =>{
    const [remaining, setRemaining] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setRemaining(Math.ceil(idleTimer.getRemainingTime() / 1000))
      }, 1000)
  
      return () => {
        clearInterval(interval)
      }
    })
    
    return(
      <Modal isOpen={open} toggle={() => setOpen(true)}>
      <div className="close cursor-pointer">
        <CloseIcon onClick={handleStillHere} size={30} />
      </div>
      <ModalHeader>
        Are you still here?
      </ModalHeader>
      <ModalBody>
        <p>Logging out in {remaining} seconds</p>
        <div className="d-flex justify-content-end">
          <TemplateButton type="button" onClick={handleStillHere} text='Im still here' />
        </div>
      </ModalBody>
    </Modal> 
    );
  }

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
        <IdleModal open={open} setOpen={setOpen} handleStillHere={handleStillHere} />
      </Fragment>
    </Router>
  );
};

const AppProvider = () => {
  return (
    <Suspense fallback={"loading"}>
      <Provider store={store}>
          <App />
      </Provider>
    </Suspense>
  );
};

export default AppProvider;
