import React from 'react';
import {Link} from 'react-router-dom'

const SignUp = () => {
    return <>
     <h1>Sign Up</h1>
     <Link to="/signin">to Sign In</Link>
     <Link to="/">to Home</Link>;
  </>
}
 
export default SignUp;