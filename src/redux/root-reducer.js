import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

/*
before persist
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});*/

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop : shopReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

export default persistReducer(persistConfig, rootReducer);