import SocialWallItemCommon from "./SocialWallItemCommon"
const SocialWallItemClassic = (props) => {
    // Overwrite this component to create own template
  return <div className="social-wall-item-classic"><SocialWallItemCommon {...props} /></div>
};
export default SocialWallItemClassic