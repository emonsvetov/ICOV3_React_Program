import React from 'react';
import {connect} from 'react-redux';

const MainWrapper = ({theme, template, children}) => {
  const direction = 'ltr';

  return (
    <div className={`${theme.className} theme-${template.name} ${direction}-support`} dir={direction}>
      <div className="wrapper">
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    template: state.template,
  };
};
export default connect(mapStateToProps)(MainWrapper);
