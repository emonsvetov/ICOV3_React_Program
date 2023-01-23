import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
import { sidebarReducer, themeReducer, rtlReducer, flashReducer, merchantReducer, organizationReducer, userReducer, programReducer, rootProgramReducer, cartReducer, balanceReducer, domainReducer, templateReducer, socialWallPostReducer, participantReducer } from '../../redux/reducers/index';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  rtl: rtlReducer,
  flashMessage: flashReducer,
  merchant: merchantReducer,
  organization: organizationReducer,
  auth: userReducer,
  program: programReducer,
  rootProgram: rootProgramReducer,
  cart: cartReducer,
  pointBalance: balanceReducer,
  domain: domainReducer,
  socialWallPost: socialWallPostReducer,
  template: templateReducer,
  participant: participantReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
