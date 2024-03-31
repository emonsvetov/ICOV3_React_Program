import React from "react";
import ParticipantTopbar from "./topbar/Participant";
import ManagerTopbar from "./topbar/Manager";
import { ManagerFooter, ParticipantFooter } from "./footer";
import { Outlet } from "react-router-dom";

export const ParticipantLayout = () => (
  <>
    <main className="participant">
      <ParticipantTopbar />
      <Outlet />
    </main>
    <ParticipantFooter />
  </>
);

export const ManagerLayout = () => (
  <>
    <main className="manager">
      <ManagerTopbar />
      <Outlet />
    </main>
    <ManagerFooter />
  </>
);
