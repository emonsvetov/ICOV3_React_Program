import React from "react";
import Points from "../Points";
import SlideOutMenu from "../../../Participant/Home/components/slide-out-menu";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SlideOutMenu isFixed={false} />
      <div className="space-30" />
        <div style={{marginTop: '300px'}}></div>
      <Points />
      <div className="space-30" />
    </div>
  );
};

export default Sidebar