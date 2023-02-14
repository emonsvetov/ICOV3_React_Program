const ApiErrorMessage = ({errors, showLabel = true, className}) => {
  console.log(errors)
    className = 'apiError-wrap form-error mt-0' + (className ? ' ' + className : '')
    if(!errors?.errors){
      if(errors?.message)
      {
        errors.errors = errors.message; //sometimes there is not errors but just a message!
      } else {
        errors.errors = "There was an error"
      }
    }
    if(errors?.e){
      errors.errors = errors.e; //sometimes there is "e" as well!
    }
    return (
        <div className={className}>
            {typeof errors.errors === 'object' && <List errors={errors.errors} />}
            {typeof errors.errors === 'string' && <span>{errors.errors}</span>}
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