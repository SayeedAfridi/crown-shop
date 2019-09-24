import React from 'react'
import {connect} from 'react-redux'
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import Cart from '../cart/cart.component'
import {createStructuredSelector} from 'reselect'
import {selectCurrentUser} from '../../redux/user/user.selectors'
import {selectCartHidden} from '../../redux/cart/cart.selectors'

const Header = ({currentUser, hidden}) => {
    return (
        <HeaderContainer>
            <LogoContainer to='/crown-shop'>
                <Logo className='logo'/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/crown-shop/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/crown-shop/shop'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                    <OptionLink as='div' onClick={() => auth.signOut()}>
                        SIGN OUT
                    </OptionLink>
                    :
                    <OptionLink to='/crown-shop/signin'>
                        SIGN IN
                    </OptionLink>
                }
                <CartIcon />
                {
                    hidden ? null : (<Cart />)
                }
                
            </OptionsContainer>
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)
