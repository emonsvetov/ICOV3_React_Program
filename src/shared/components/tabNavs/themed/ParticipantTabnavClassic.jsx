import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Tabnav from "../components/Tabnav"; 

const TabnavClassic = (props)=> {
  return <Tabnav {...props} />
}

const ParticipantTabnavClassic = ({program, template}) => {
  const { t } = useTranslation();

  const TAB_ITEMS = [
    { title: "my_rewards", icon: "redeem", to: `/participant/my-points` },
  ];

  if(program.uses_peer2peer
      > 0) {
    TAB_ITEMS.push({
      title: "peer_to_peer",
      icon: "gift",
      to: "/participant/peer-to-peer",
    })
  }

  if(program.uses_leaderboards > 0){
    TAB_ITEMS.push({
      title: "leaderboards",
      icon: "leaderboard",
      to: "/participant/leaderboards",
    })
  }

  if(program.uses_goal_tracker > 0){
    TAB_ITEMS.push({
      title: "my_goals",
      icon: "survey",
      to: "/participant/my-goals",
    })
  }

  let navigate = useNavigate();
  if( ! program ) return 'loading...'
  return (
      <div className="">
        <ul className="horizontal d-flex justify-content-evenly">
          {TAB_ITEMS.map((item, key) => {
            return (
                Object.keys(TAB_ITEMS).length > 1 ?
                    <li key={key} onClick={() => navigate(item.to)}>
                      <TabnavClassic title={t(item.title)} icon={item.icon}/>
                    </li>
                    :
                    <h5 style={{color: 'black'}} className="social-wall-item-notification-body padding-10">{template?.participant_homepage_message
                      ? template.participant_homepage_message.replace(/(<([^>]+)>)/ig, "")
                      : t("participant_homepage_message")}</h5>
            );
          })}
        </ul>
      </div>
  );
};
export default connect((state) => ({
  program: state.program,
  template: state.domain?.program?.template,
}))(ParticipantTabnavClassic);