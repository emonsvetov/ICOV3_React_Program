import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, getAuthUser } from "./auth";
import Footer from "../Layout/footer";

export const PublicRoute = () => {
  // console.log('PublicRoute')
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname)
  useEffect(() => {
    if (isAuthenticated()) {
      const user = getAuthUser();
      let sentTo = "/";
      if (user.loginAs.name === "Manager") {
        sentTo = "/manager/home";
      } else if (user.loginAs.name === "Participant") {
        sentTo = "/participant/home";
      }
      navigate(sentTo);
    } else if (location.pathname === "/") {
      navigate("/login");
    }
    // else{
    //     navigate('/login')
    // }
  }, []);

  return (
    <>
      <main className="home">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicRoute;
