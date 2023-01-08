import { handleActions } from 'redux-actions';
import {
  setTheme,
  changeThemeToDark,
  changeThemeToLight,
} from '../actions/themeActions';

const defaultState = {
  className: 'theme-light',
  name: 'original',
  big_logo: `logo/big_logo.png`, // ALL Media paths relative to public/theme/{name} folder
  small_logo: `logo/small_logo.png`,
  welcome_message: `Welcome to INCENTCO's Global Solutions rewards site! When you participate in our program, you'll earn rewards for various activities.`,
};

export default handleActions(
  {
    [changeThemeToDark]() {
      return { className: 'theme-dark' };
    },
    [changeThemeToLight]() {
      return { className: 'theme-light' };
    },    
    [setTheme](state, action) {
        return { ...state, ...action.payload }
    }
  },
  defaultState,
);
