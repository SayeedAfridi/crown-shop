import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css'
import Homepage from './pages/Hompage/homepage.component'
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component'
import SigninAndSignup from './components/signin-and-signup/signin-and-signup.component';
import {auth, createUserProfileDoc} from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from './redux/user/user.selectors'


class App extends React.Component {

  
  unSubscribeFromAuth = null;
  
  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDoc(userAuth)
        userRef.onSnapshot(snapshot =>{
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
        
      }else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth()
  }
  

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/' />) : (<SigninAndSignup/>)} />
        </Switch>
      </div>
    )
  }
}


const mapStateToProps  = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
