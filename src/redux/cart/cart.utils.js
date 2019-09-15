export const addItemToCart = (cartItems, cartItemToAdd) => {
    const exists = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)
    if(exists){
        return cartItems.map(cartItem => (
            cartItem.id === cartItemToAdd.id 
            ? { ...cartItem, quantity:cartItem.quantity+1} 
            : cartItem
        ))

    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, toRemove) => {
    const exists = cartItems.find(item => item.id === toRemove.id)

    if(exists.quantity === 1){
        return cartItems.filter(item => item.id !== toRemove.id)
    }

    return cartItems.map(item =>
            item.id === toRemove.id ?
                {...item, quantity: item.quantity-1}
            :
                item
        )
}