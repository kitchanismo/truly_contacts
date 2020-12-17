import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return <>
     <h1>Home</h1>
    <Link to="/signin">to Sign In</Link>
    <Link to="/signin">to Sign Up</Link>
    </>;
}
 
export default Home;