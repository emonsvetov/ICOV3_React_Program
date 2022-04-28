import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => (<span className="text-danger validation-error">{error}</span>);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
