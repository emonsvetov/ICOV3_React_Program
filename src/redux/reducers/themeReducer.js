import { handleActions } from 'redux-actions';
import {
  setThemeAction,
  changeThemeToDark,
  changeThemeToLight,
} from '../actions/themeActions';
import { setTheme } from "@/containers/App/auth";

const defaultState = {
  className: 'theme-light',
  name: 'Clear',
  alias: 'original',
  dirName: 'original',
  dirPath: `${process.env.PUBLIC_URL}/theme/original`
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
