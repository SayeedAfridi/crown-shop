import React from 'react'

import './sign-up.style.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {auth, createUserProfileDoc} from '../../firebase/firebase.utils'

class SignUp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            displayName:'',
            email: '',
            password: '',
            confirmPassword:''
        }
    }

    handleSubmit = async e => {
        e.preventDefault()

        const {displayName, email, password, confirmPassword} = this.state
        if(password !== confirmPassword){
            alert("password doesn't match")
            return
        }

        const data = {displayName}

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            
            await createUserProfileDoc(user, data)
            this.setState({
                displayName:'',
                email: '',
                password: '',
                confirmPassword:''
            })

        } catch (error) {
            console.log('error creating user',  error)
        }
    }

    handleChange = e => {
        const {value, name} = e.target
        this.setState({[name]: value})
    }

    render(){
        return(
            <div className='sign-up'>
                <h2>I don't have an account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='name'
                        name='displayName'
                        label='Display Name'
                        handleChange={this.handleChange}
                        value={this.state.displayName}
                    />
                    <FormInput 
                        type='email'
                        name='email'
                        label='Email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                    />
                    <FormInput 
                        type='password'
                        name='password'
                        label='Password'
                        handleChange={this.handleChange}
                        value={this.state.password}
                    />
                    <FormInput 
                        type='password'
                        name='confirmPassword'
                        label='Confirm Password'
                        handleChange={this.handleChange}
                        value={this.state.confirmPassword}
                    />
                    <CustomButton type='submit'>Sign up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp