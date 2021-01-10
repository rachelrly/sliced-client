import React, { useContext, useEffect } from 'react';
import { Fragment } from 'react';
import { UserContext } from '../../contexts/user-context'

function ErrorText() {
  /*This componenet renders the errors from context if they are prensent and 
  clears errors when component unmounts*/

  const { error, setError } = useContext(UserContext);
  useEffect(() => { return setError(null) }, [])

  return (
    <Fragment>
      {error ? <span className='error'>{error}</span> : null}
    </Fragment>
  )
}

export default ErrorText;
