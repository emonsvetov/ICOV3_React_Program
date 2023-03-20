import { handleActions } from 'redux-actions';
import {
  setThemeAction,
  changeThemeToDark,
  changeThemeToLight,
} from '../actions/themeActions';
import { setTheme } from "@/containers/App/auth";

const defaultState = {
  className: 'theme-light',
  name: 'clear',
  alias: 'clear',
  dirName: 'clear',
  dirUrl: `${process.env.PUBLIC_URL}/theme/clear`
};

export default handleActions(
  {
    [changeThemeToDark]() {
      return { className: 'theme-dark' };
    },
    [changeThemeToLight]() {
      return { className: 'theme-light' };
    },    
    [setThemeAction](state, action) {
        setTheme(action.payload)
        return { ...state, ...action.payload }
    }
  },
  defaultState,
);
