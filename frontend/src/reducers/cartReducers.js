import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (ele) => ele.product === item.product
            );
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((ele) =>
                        ele.product === isItemExist.product ? item : ele
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (ele) => ele.product !== action.payload
                ),
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };
        default:
            return state;
    }
};
