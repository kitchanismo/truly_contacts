import React from 'react';
import {TextField, makeStyles, Typography } from '@material-ui/core';
import MyButton from '../../ui/MyButton'

const SignUp = () => {
    const classes = useStyles();

return <>
    <div className={classes.container}>
        <Typography variant='h4'>Register</Typography>
        <TextField id="username" label="Username" />
        <TextField id="password" type="password" label="Password" />
        <MyButton className={classes.btn} variant="contained" color="primary">
            Sign up
        </MyButton>
    </div>
  </>
}

const useStyles = makeStyles((theme) => ({
    ...theme.styles,
}));


 
export default SignUp;