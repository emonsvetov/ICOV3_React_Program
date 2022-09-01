import React from 'react';
import {connect} from 'react-redux';

const MainWrapper = ({theme, children}) => {
  return (
    <div className={`${theme.className} `}>
      <div className="wrapper">
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};
export default connect(mapStateToProps)(MainWrapper);
