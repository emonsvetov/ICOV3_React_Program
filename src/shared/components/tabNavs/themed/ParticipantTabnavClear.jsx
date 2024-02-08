import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../components/style.scss";
import { getTabnavItems } from "@/shared/components/tabNavs/components/TabnavItems";

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
    // console.log(template)
    const { t } = useTranslation();
    const TAB_ITEMS = getTabnavItems(program)
  
    let navigate = useNavigate();
    return (
        <div className="">
            {!template?.participant_homepage_message && TAB_ITEMS.length < 1 && (
                <div style={{color: 'black'}} className="social-wall-item-notification-body padding-10 pt-3">
                    {t("participant_homepage_message")}
                </div>
            )}
            {TAB_ITEMS.length > 0 && (
                <ul className="horizontal d-flex justify-content-evenly">
                    {TAB_ITEMS.map((item, key) => (
                        <li key={key} onClick={() => navigate(item.to)}>
                            <TabnavClear title={t(item.title)} icon={item.icon}/>
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
}))(ParticipantTabnavClear);
