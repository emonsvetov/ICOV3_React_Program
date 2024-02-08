import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Tabnav from "../components/Tabnav"; 
import { getTabnavItems } from "@/shared/components/tabNavs/components/TabnavItems";

const TabnavClassic = (props)=> {
  return <Tabnav {...props} />
}

const ParticipantTabnavClassic = ({program, template}) => {
  const { t } = useTranslation();

  const TAB_ITEMS = getTabnavItems(program);

  let navigate = useNavigate();
  if( ! program ) return 'loading...'
  return (
      <div className="">
        {!template?.participant_homepage_message && TAB_ITEMS.length < 1 && (
            <h5 style={{color: 'black'}} className="social-wall-item-notification-body padding-10 pt-3">
              {t("participant_homepage_message")}
            </h5>
        )}
        {TAB_ITEMS.length > 0 && (
            <ul className="horizontal d-flex justify-content-evenly">
              {TAB_ITEMS.map((item, key) => (
                  <li key={key} onClick={() => navigate(item.to)}>
                    <TabnavClassic title={t(item.title)} icon={item.icon}/>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};
export default connect((state) => ({
  program: state.program,
  template: state.template,
}))(ParticipantTabnavClassic);