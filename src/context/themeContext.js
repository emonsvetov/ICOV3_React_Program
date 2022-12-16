import { createDataContext } from "@/utils/context";

export const SET_THEME = "SET_THEME";
export const SWITCH_THEME = "SWITCH_THEME";

const INITIAL_STATE = {
  themeName: "original",
  themeSettings: {
    big_logo: `logo/big_logo.png`,
    small_logo: `logo/small_logo.png`,
    welcome_message: `Welcome to INCENTCO's Global Solutions rewards site! When you participate in our program, you'll earn rewards for various activities.`,
  },
};

const themeReducer = (state, action) => {
  console.log("themeContext themeReducer", action.payload);
  switch (action.type) {
    case SET_THEME:
      return { ...state, themeSettings: action.payload.payload };
    case SWITCH_THEME:
      return { ...state, themeName: action.payload.payload };
    default:
      return state;
  }
};

export const setTheme = (dispatch) => (themeSettings) =>
  dispatch({
    type: SET_THEME,
    payload: themeSettings,
  });

export const switchTheme = (dispatch) => (themeName) =>
  dispatch({
    type: SWITCH_THEME,
    payload: themeName,
  });

export const { Context: themeContext, Provider: ThemeProvider } =
  createDataContext(themeReducer, { setTheme, switchTheme }, INITIAL_STATE);
