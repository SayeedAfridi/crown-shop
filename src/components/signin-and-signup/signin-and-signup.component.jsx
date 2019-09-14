import React from 'react'
import SignIn from '../sign-in/sign-in.component'
import './signin-and-signup.style.scss'
import SignUp from '../sign-up/sign-up.component'

const SigninAndSignup = () => {
    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SigninAndSignup