import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import Points from "./Points";
import PointsOrigin from "./PointsOrigin";
import Leaderboards from "./Leaderboards";
import SlideOutMenu from "../../Participant/Home/components/slide-out-menu";
import TabNavOrigin from "@/shared/components/tabNavs/components/TabnavOrigin";
import { useTranslation } from "react-i18next";

export const Sidebar = () => (
  <div className="sidebar">
    <Points />
    <Leaderboards />
  </div>
);

export const SidebarOrigin = () => {
  const { t } = useTranslation();
  // const { title, icon } = props;

  return (
    <div className="sidebar">
      <SlideOutMenu isFixed={false} />
      <div className="space-30" />
      <PointsOrigin />
      <div className="space-30" />
      <TabNavOrigin title={t("my_rewards")} icon={"MyRewards"} />
      {/* {title:"My Rewards", icon:"MyRewards", to:`/participant/my-points`}, */}
    </div>
  );
};
