import SocialWallItemCommon from "./SocialWallItemCommon"
const SocialWallItemClear = (props) => {
  // Overwrite this component to create own template
  return <div className="social-wall-item-clear"><SocialWallItemCommon {...props} /></div>
};
export default SocialWallItemClear