import React from 'react';
import {connect} from 'react-redux';

const MainWrapper = ({theme, children}) => {
  const direction = 'ltr';

  return (
    <div className={`${theme.className} ${direction}-support`} dir={direction}>
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
