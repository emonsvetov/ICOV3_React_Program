import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../components/style.scss";

function TabnavClear(props) {
  const { title, icon, isActive } = props;
  const img_icon = `${process.env.PUBLIC_URL}/theme/clear/img/tab_navs/${icon}.png`;
  return (
    <div className="cursor-pointer">
      <h3 className="text-center pb-1" style={{ fontSize: "16px" }}>
        {title}
      </h3>
      <div className="d-flex justify-content-center">
        <img
          className=" rounded-1"
          alt={title}
          src={img_icon}
          width={"150px"}
        />
      </div>
    </div>
  );
}
TabnavClear.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};
TabnavClear.defaultProps = {};

export const ParticipantTabnavClear = ({program, template}) => {
    console.log(template)
    const { t } = useTranslation();
    const TAB_ITEMS = [
      // { title: "my_rewards", icon: "MyRewards", to: `/participant/my-points` },
    ];
  
    if(program.uses_peer2peer
        > 0){
      TAB_ITEMS.push({
        title: "peer_to_peer",
        icon: "PeerToPeer",
        to: "/participant/peer-to-peer",
      },)
    }
  
    if(program.uses_leaderboards > 0){
      TAB_ITEMS.push({
        title: "leaderboards",
        icon: "Leaderboards",
        to: "/participant/leaderboards",
      },)
    }
  
    if(program.uses_goal_tracker > 0){
      TAB_ITEMS.push({
        title: "my_goals",
        icon: "MyGoals",
        to: "/participant/my-goals",
      },)
    }
  
    let navigate = useNavigate();
    return (
      <div className="">
        <ul className="horizontal d-flex justify-content-evenly">
          {TAB_ITEMS.map((item, key) => {
            return (
                Object.keys(TAB_ITEMS).length > 1 ?
                    <li key={key} onClick={() => navigate(item.to)}>
                        <TabnavClear title={t(item.title)} icon={item.icon}/>
                    </li>
                    :
                    <h5 style={{color: 'black'}} className="social-wall-item-notification-body padding-10">
                      {template?.participant_homepage_message
                      ? template.participant_homepage_message
                      : t("participant_homepage_message")}
                    </h5>
            );
          })}
        </ul>
      </div>
    );
};
export default connect((state) => ({
  program: state.program,
  template: state.template,
}))(ParticipantTabnavClear);