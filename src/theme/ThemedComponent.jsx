import React from "react";
import { connect } from "react-redux";
const paths = {
  SocialWall: "containers/Participant/Home/socialWall",
  SocialWallItem: "containers/Participant/Home/socialWall",
  MerchantSlider: "containers/Participant/Home/components/slider",
  Sidebar: "containers/Layout/sidebar",
  Cart: "containers/Participant/components",
  Navbar: "containers/Layout/topbar",
  ParticipantTabnav: "shared/components/tabNavs",
  RedeemMerchant: "containers/Participant/RedeemPoints",
  MyGiftCodes: "containers/Participant/GiftCodes",
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const ThemedComponent = (props) => {
  const { component, template } = props;
  const tplPostfix = capitalizeFirstLetter(template.name)
  const Component = React.lazy(() =>
    import(`@/${paths[component]}/themed/${component}${tplPostfix}`).catch(
      (e) => ({ default: () => <div>Template [{component}{tplPostfix}] Not found</div> })
    )
  );
  if( !template?.name ) return ''
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};
export default connect((state) => ({
  template: state.template
}))(ThemedComponent);
