import React from 'react';
import {Link} from 'react-router-dom'

const SignIn = () => {
    return <>
    <h1>Sign In</h1>
      <Link to="/signup">to Sign Up</Link>
     <Link to="/">to Home</Link>;
  </>
}
 
export default SignIn;