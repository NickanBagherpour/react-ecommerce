export const addItemToCart = (cartItems, newItem) => {
    const existingCartItem = cartItems.find((item) => item.id === newItem.id);

    if (existingCartItem) {
        return cartItems.map((item) =>
            item.id === newItem.id ? {...item, quantity: item.quantity + 1} : item
        );
    }

    return [...cartItems, {...newItem, quantity: 1}];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id); //or return clearItemFromCart(cartItems, cartItemToRemove)
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    );
};

export const clearItemFromCart = (cartItems, selectedItem) => {
    return cartItems.filter(item => item.id !== selectedItem.id);
};
