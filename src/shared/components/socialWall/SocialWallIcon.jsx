import React from 'react';
import StarIcon from 'mdi-react/StarFaceIcon';
import StarThreePoints from 'mdi-react/StarThreePointsIcon';

const components = {
  StarIcon,
  StarThreePoints
};

const SocialWallIcon = (props) => {
  const {icon} = props.data;
  const CurrentIcon = components[icon];
  return <CurrentIcon />;
}

export default SocialWallIcon;
