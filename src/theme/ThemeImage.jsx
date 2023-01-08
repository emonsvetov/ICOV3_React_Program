import { connect } from "react-redux";
import PropTypes from 'prop-types';

const ThemeImage = ({ src, width, height, className, theme, themed, title }) => {

  let imgSrc = `${src}`

  if ( themed ) {
    imgSrc = `theme/${theme.name}/${imgSrc}`
  }

  imgSrc = `${process.env.PUBLIC_URL}${imgSrc.indexOf('/') === 0 ? '' : '/'}${imgSrc}`

  let imgProps = {
    src: imgSrc,
    width: width,
    height: height,
    className: className,
    title: title
  }

  // try {
  //   const src = require(imgSrc)
  //   this.setState({ src });
  // }
  // catch (err) 
  // {
  //   //Do whatever you want when the image failed to load here
  // }

  return <img {...imgProps} />
}

ThemeImage.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string
};

ThemeImage.defaultProps = {
  themed: true,
};

export default connect((state) => ({
  // template: state.template,
  theme: state.theme
}))(ThemeImage);