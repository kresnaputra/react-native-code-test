import React, { Dispatch, useState } from "react";
import { IUserState, TUserAction } from "../types/contexts/UserContext";

const initialState: IUserState = {
  uid: "",
};

const reducer = (state: IUserState, action: TUserAction): IUserState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        uid: action.payload.uid,
      };
    case "LOGOUT":
      return {
        ...state,
        uid: "",
      };
    default:
      return state;
  }
};

export const UserContext = React.createContext<{state: IUserState, dispatch: Dispatch<TUserAction>}>({state: initialState, dispatch: () => {}});

const UserContextProvider: React.FC = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
