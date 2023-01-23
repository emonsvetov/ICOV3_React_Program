import { createContext, useReducer } from "react";

export const createDataContext = (reducer, actions, defaultState) => {
  const Context = createContext(defaultState);

  const Provider = ({ children, initialState }) => {
    const [state, dispatch] = useReducer(reducer, initialState ?? defaultState);

    const boundActions = {};
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, actions: { ...boundActions } }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
