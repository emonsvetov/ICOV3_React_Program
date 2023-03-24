import React from "react";
import PointsOrigin from "../PointsOrigin";
import SlideOutMenu from "../../../Participant/Home/components/slide-out-menu";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SlideOutMenu isFixed={false} />
      <div className="space-30" />
      <PointsOrigin />
      <div className="space-30" />
    </div>
  );
};

export default Sidebar