import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
import { sidebarReducer, themeReducer, rtlReducer, flashReducer, merchantReducer, organizationReducer, userReducer, programReducer, cartReducer } from '../../redux/reducers/index';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  rtl: rtlReducer,
  flashMessage: flashReducer,
  merchant: merchantReducer,
  organization: organizationReducer,
  cart: cartReducer,
  auth: userReducer,
  program: programReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
