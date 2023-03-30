import React from "react";
import Points from "../Points";
import SlideOutMenu from "../../../Participant/Home/components/slide-out-menu";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SlideOutMenu isFixed={true} />
      <div className="space-30" />
      <Points />
      <div className="space-30" />
      {/*<TabNavOrigin title={t("my_rewards")} icon={"MyRewards"} />*/}
      {/* {title:"My Rewards", icon:"MyRewards", to:`/participant/my-points`}, */}
    </div>
  );
};

export default Sidebar