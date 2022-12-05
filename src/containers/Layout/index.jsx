import React from "react";
import ParticipantTopbar from "./topbar/Participant";
import ManagerTopbar from "./topbar/Manager";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export const ParticipantLayout = () => (
  <>
    <main>
      <ParticipantTopbar />
      <Outlet />
    </main>
    <Footer />
  </>
);

export const ManagerLayout = () => (
  <>
    <main className="manager">
      <ManagerTopbar />
      <Outlet />
    </main>
    <Footer />
  </>
);
