const ApiErrorMessage = ({errors, showLabel = true, className}) => {
  console.log(errors)
    let tmpErrors = errors; 
    errors = null;
    if( typeof tmpErrors.response !== 'undefined' ) {
      if(typeof tmpErrors.response.data !== 'undefined') {
        if(typeof tmpErrors.response.data.errors !== 'undefined') {
          errors = tmpErrors.response.data.errors
        } else {
          errors = tmpErrors.response.data
        }
      } else {
        if( typeof tmpErrors.response.errors !== 'undefined' )  {
          errors = tmpErrors.response.errors
        } else {
          errors = tmpErrors.response
        }
      }
    } else if (typeof tmpErrors.data !== 'undefined') {
      if(typeof tmpErrors.data.errors !== 'undefined') {
        errors = tmpErrors.data.errors
      } else {
        errors = tmpErrors.data
      }
    } else if (typeof tmpErrors.errors !== 'undefined') {
      errors = tmpErrors.errors
    } else if (typeof tmpErrors.error !== 'undefined') {
      errors = tmpErrors.error
    } else if (typeof tmpErrors.message !== 'undefined') {
      errors = tmpErrors.message
    } else if (typeof tmpErrors.e !== 'undefined') {
      errors = tmpErrors.e
    } else if ( tmpErrors ) {
      errors = tmpErrors
    } else {
      errors = "There was an error"
    }

    className = 'apiError-wrap form-error mt-0' + (className ? ' ' + className : '')
    return (
        <div className={className}>
            {typeof errors === 'object' && <List errors={errors} />}
            {typeof errors === 'string' && <span>{errors}</span>}
        </div>
    )
}

const List = ({errors}) => (
    <ul className="apiError-list">
        {
            Object.keys(errors).map(function(k){
                return <li key={k}  className="apiError-listItem">{errors[k]}</li>
            })
        }
    </ul>
)

export default ApiErrorMessage